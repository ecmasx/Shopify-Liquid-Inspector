export interface ShopifyTagDefinition {
  name: string;
  description: string;
  category: string;
  parameters?: { [key: string]: any };
  syntax?: string;
  examples?: string[];
  deprecated?: boolean;
  endTag?: string;
  selfClosing?: boolean;
}

export class ShopifyTagRegistry {
  private tags: { [key: string]: ShopifyTagDefinition } = {};

  constructor() {
    this.initializeTags();
  }

  getTag(name: string): ShopifyTagDefinition | null {
    return this.tags[name] || null;
  }

  getAllTags(): { [key: string]: ShopifyTagDefinition } {
    return this.tags;
  }

  getTagsByCategory(category: string): {
    [key: string]: ShopifyTagDefinition;
  } {
    const result: { [key: string]: ShopifyTagDefinition } = {};
    Object.keys(this.tags).forEach((key) => {
      if (this.tags[key].category === category) {
        result[key] = this.tags[key];
      }
    });
    return result;
  }

  private initializeTags() {
    this.tags = {
      if: {
        name: "if",
        description: "Renders an expression if a specific condition is true",
        category: "Conditional",
        syntax: "{% if condition %} ... {% endif %}",
        endTag: "endif",
        examples: [
          "{% if product.available %}\n  <p>In Stock</p>\n{% endif %}",
          '{% if product.compare_at_price > product.price %}\n  <span class="sale">On Sale!</span>\n{% endif %}',
        ],
      },

      elsif: {
        name: "elsif",
        description: "Checks for additional conditions in an if statement",
        category: "Conditional",
        syntax: "{% elsif condition %}",
        examples: [
          "{% if product.type == 'Love' %}\n  <p>Love potion!</p>\n{% elsif product.type == 'Health' %}\n  <p>Health potion!</p>\n{% endif %}",
        ],
      },

      else: {
        name: "else",
        description:
          "Specifies a default expression when no other condition is met",
        category: "Conditional",
        syntax: "{% else %}",
        examples: [
          "{% if product.available %}\n  <p>In Stock</p>\n{% else %}\n  <p>Sold Out</p>\n{% endif %}",
        ],
      },

      unless: {
        name: "unless",
        description:
          "Renders an expression unless a specific condition is true",
        category: "Conditional",
        syntax: "{% unless condition %} ... {% endunless %}",
        endTag: "endunless",
        examples: [
          "{% unless product.available %}\n  <p>Sorry, this product is sold out</p>\n{% endunless %}",
        ],
      },

      case: {
        name: "case",
        description:
          "Renders a specific expression depending on the value of a variable",
        category: "Conditional",
        syntax: "{% case variable %} ... {% endcase %}",
        endTag: "endcase",
        examples: [
          "{% case product.type %}\n  {% when 'Health' %}\n    <p>Restore your HP!</p>\n  {% when 'Love' %}\n    <p>Find your true love!</p>\n  {% else %}\n    <p>Magic item</p>\n{% endcase %}",
        ],
      },

      when: {
        name: "when",
        description: "Defines a condition within a case statement",
        category: "Conditional",
        syntax: "{% when value %}",
        examples: [
          "{% case product.type %}\n  {% when 'shirt', 'hoodie' %}\n    <p>Clothing item</p>\n  {% when 'book' %}\n    <p>Reading material</p>\n{% endcase %}",
        ],
      },

      form: {
        name: "form",
        description:
          "Generates an HTML form tag with Shopify-specific attributes",
        category: "HTML",
        syntax: "{% form 'form_type' %} ... {% endform %}",
        endTag: "endform",
        parameters: {
          form_type: {
            type: "string",
            description: "Type of form to generate",
            required: true,
          },
          return_to: {
            type: "string",
            description: "URL to redirect after form submission",
          },
        },
        examples: [
          "{% form 'product', product %}\n  <!-- Add to cart form -->\n  <button type=\"submit\">Add to Cart</button>\n{% endform %}",
          '{% form \'contact\' %}\n  <input type="email" name="contact[email]" placeholder="Email">\n  <textarea name="contact[body]" placeholder="Message"></textarea>\n  <button type="submit">Send</button>\n{% endform %}',
        ],
      },

      style: {
        name: "style",
        description: "Generates an HTML style tag with data-shopify attribute",
        category: "HTML",
        syntax: "{% style %} ... {% endstyle %}",
        endTag: "endstyle",
        examples: [
          "{% style %}\n  .custom-class {\n    color: {{ settings.accent_color }};\n    font-size: 16px;\n  }\n{% endstyle %}",
        ],
      },

      for: {
        name: "for",
        description: "Renders an expression for every item in an array",
        category: "Iteration",
        syntax: "{% for variable in array %} ... {% endfor %}",
        endTag: "endfor",
        parameters: {
          limit: {
            type: "number",
            description: "Limit the number of iterations",
          },
          offset: {
            type: "number",
            description: "Start iteration at a specific index",
          },
          reversed: {
            type: "boolean",
            description: "Iterate in reverse order",
          },
        },
        examples: [
          "{% for product in collection.products %}\n  <h3>{{ product.title }}</h3>\n  <p>${{ product.price | money }}</p>\n{% endfor %}",
          '{% for product in collection.products limit: 4 %}\n  <div class="product-card">\n    {{ product.title }}\n  </div>\n{% endfor %}',
        ],
      },

      break: {
        name: "break",
        description: "Stops a for loop from iterating",
        category: "Iteration",
        syntax: "{% break %}",
        selfClosing: true,
        examples: [
          "{% for product in collection.products %}\n  {% if product.price > 100 %}\n    {% break %}\n  {% endif %}\n  {{ product.title }}\n{% endfor %}",
        ],
      },

      continue: {
        name: "continue",
        description: "Causes a for loop to skip to the next iteration",
        category: "Iteration",
        syntax: "{% continue %}",
        selfClosing: true,
        examples: [
          "{% for product in collection.products %}\n  {% if product.available == false %}\n    {% continue %}\n  {% endif %}\n  {{ product.title }}\n{% endfor %}",
        ],
      },

      cycle: {
        name: "cycle",
        description:
          "Loops through a group of strings and outputs them one at a time",
        category: "Iteration",
        syntax: "{% cycle 'group': 'string1', 'string2' %}",
        selfClosing: true,
        examples: [
          "{% for product in collection.products %}\n  <div class=\"{% cycle 'odd', 'even' %}\">\n    {{ product.title }}\n  </div>\n{% endfor %}",
        ],
      },

      tablerow: {
        name: "tablerow",
        description: "Generates HTML table rows for every item in an array",
        category: "Iteration",
        syntax: "{% tablerow variable in array %} ... {% endtablerow %}",
        endTag: "endtablerow",
        parameters: {
          cols: {
            type: "number",
            description: "Number of columns in the table",
          },
          limit: {
            type: "number",
            description: "Limit the number of iterations",
          },
          offset: {
            type: "number",
            description: "Start iteration at a specific index",
          },
        },
        examples: [
          "<table>\n  {% tablerow product in collection.products cols: 3 %}\n    <td>{{ product.title }}</td>\n  {% endtablerow %}\n</table>",
        ],
      },

      paginate: {
        name: "paginate",
        description: "Splits an array's items across multiple pages",
        category: "Iteration",
        syntax: "{% paginate array by page_size %} ... {% endpaginate %}",
        endTag: "endpaginate",
        parameters: {
          by: {
            type: "number",
            description: "Number of items per page (1-250)",
            required: true,
          },
          window_size: {
            type: "number",
            description: "Number of pages visible in navigation",
          },
        },
        examples: [
          "{% paginate collection.products by 12 %}\n  {% for product in collection.products %}\n    {{ product.title }}\n  {% endfor %}\n  {{ paginate | default_pagination }}\n{% endpaginate %}",
        ],
      },

      comment: {
        name: "comment",
        description: "Prevents an expression from being rendered or output",
        category: "Syntax",
        syntax: "{% comment %} ... {% endcomment %}",
        endTag: "endcomment",
        examples: [
          "{% comment %}\n  This is a comment that won't be rendered\n  {{ product.title }}\n{% endcomment %}",
        ],
      },

      doc: {
        name: "doc",
        description: "Documents template elements with annotations",
        category: "Syntax",
        syntax: "{% doc %} ... {% enddoc %}",
        endTag: "enddoc",
        examples: [
          "{% doc %}\n  @param product {Product} The product object\n  @returns {String} Product title with price\n{% enddoc %}",
        ],
      },

      echo: {
        name: "echo",
        description: "Outputs an expression (same as {{ }})",
        category: "Syntax",
        syntax: "{% echo expression %}",
        selfClosing: true,
        examples: [
          "{% liquid\n  assign message = 'Hello World'\n  echo message\n%}",
        ],
      },

      liquid: {
        name: "liquid",
        description: "Allows a block of Liquid without delimiters on each tag",
        category: "Syntax",
        syntax: "{% liquid %} ... {% endliquid %}",
        endTag: "endliquid",
        examples: [
          "{% liquid\n  assign product_title = product.title | upcase\n  if product.available\n    echo product_title\n  else\n    echo 'Sold Out'\n  endif\n%}",
        ],
      },

      raw: {
        name: "raw",
        description: "Outputs Liquid code as text instead of rendering it",
        category: "Syntax",
        syntax: "{% raw %} ... {% endraw %}",
        endTag: "endraw",
        examples: [
          "{% raw %}\n  This will output: {{ product.title }}\n  Without rendering the variable\n{% endraw %}",
        ],
      },

      content_for: {
        name: "content_for",
        description: "Creates a designated area where blocks can be rendered",
        category: "Theme",
        syntax: "{% content_for 'type' %}",
        selfClosing: true,
        parameters: {
          type: {
            type: "string",
            description: "'blocks' or 'block'",
            required: true,
          },
          id: { type: "string", description: "Block ID (for static blocks)" },
        },
        examples: [
          "{% content_for 'blocks' %}",
          "{% content_for 'block', type: 'slide', id: 'hero-slide-1' %}",
        ],
      },

      include: {
        name: "include",
        description: "Renders a snippet (deprecated - use render instead)",
        category: "Theme",
        syntax: "{% include 'snippet-name' %}",
        selfClosing: true,
        deprecated: true,
        examples: [
          "{% include 'product-card' %}",
          "{% include 'product-card', product: collections.featured.products.first %}",
        ],
      },

      javascript: {
        name: "javascript",
        description:
          "JavaScript code included in section, block and snippet files",
        category: "Theme",
        syntax: "{% javascript %} ... {% endjavascript %}",
        endTag: "endjavascript",
        examples: [
          "{% javascript %}\n  console.log('Hello from Shopify');\n  document.addEventListener('DOMContentLoaded', function() {\n    // Your JavaScript code\n  });\n{% endjavascript %}",
        ],
      },

      layout: {
        name: "layout",
        description: "Specify which layout to use",
        category: "Theme",
        syntax: "{% layout 'layout-name' %}",
        selfClosing: true,
        examples: ["{% layout 'full-width' %}", "{% layout none %}"],
      },

      render: {
        name: "render",
        description: "Renders a snippet or app block",
        category: "Theme",
        syntax: "{% render 'snippet-name' %}",
        selfClosing: true,
        parameters: {
          with: {
            type: "object",
            description: "Pass an object to the snippet",
          },
          as: { type: "string", description: "Alias for the passed object" },
          for: {
            type: "array",
            description: "Render snippet for each item in array",
          },
        },
        examples: [
          "{% render 'product-card' %}",
          "{% render 'product-card', product: collections.featured.products.first %}",
          "{% render 'product-card' with collections.featured.products.first as product %}",
          "{% render 'product-card' for collection.products %}",
        ],
      },

      section: {
        name: "section",
        description: "Renders a section statically",
        category: "Theme",
        syntax: "{% section 'section-name' %}",
        selfClosing: true,
        examples: [
          "{% section 'header' %}",
          "{% section 'featured-collection' %}",
        ],
      },

      sections: {
        name: "sections",
        description: "Renders a section group",
        category: "Theme",
        syntax: "{% sections 'group-name' %}",
        selfClosing: true,
        examples: [
          "{% sections 'header-group' %}",
          "{% sections 'footer-group' %}",
        ],
      },

      stylesheet: {
        name: "stylesheet",
        description: "CSS styles included in section, block, and snippet files",
        category: "Theme",
        syntax: "{% stylesheet %} ... {% endstylesheet %}",
        endTag: "endstylesheet",
        examples: [
          "{% stylesheet %}\n  .custom-section {\n    background: {{ section.settings.bg_color }};\n    padding: 2rem;\n  }\n{% endstylesheet %}",
        ],
      },

      assign: {
        name: "assign",
        description: "Creates a new variable",
        category: "Variable",
        syntax: "{% assign variable_name = value %}",
        selfClosing: true,
        examples: [
          "{% assign product_title = product.title | upcase %}",
          "{% assign sale_price = product.price | times: 0.8 %}",
          "{% assign featured_products = collections.featured.products | limit: 4 %}",
        ],
      },

      capture: {
        name: "capture",
        description: "Creates a new variable with a string value",
        category: "Variable",
        syntax: "{% capture variable %} ... {% endcapture %}",
        endTag: "endcapture",
        examples: [
          "{% capture product_summary %}\n  {{ product.title }} - ${{ product.price | money }}\n  {% if product.available %}In Stock{% else %}Sold Out{% endif %}\n{% endcapture %}",
        ],
      },

      decrement: {
        name: "decrement",
        description:
          "Creates a variable that decreases by 1 with each call (starts at -1)",
        category: "Variable",
        syntax: "{% decrement variable_name %}",
        selfClosing: true,
        examples: [
          "{% for product in collection.products %}\n  Item {% decrement counter %}: {{ product.title }}\n{% endfor %}",
        ],
      },

      increment: {
        name: "increment",
        description:
          "Creates a variable that increases by 1 with each call (starts at 0)",
        category: "Variable",
        syntax: "{% increment variable_name %}",
        selfClosing: true,
        examples: [
          "{% for product in collection.products %}\n  Item {% increment counter %}: {{ product.title }}\n{% endfor %}",
        ],
      },
    };
  }
}
