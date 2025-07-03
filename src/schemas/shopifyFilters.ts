export interface ShopifyFilterDefinition {
  name: string;
  description: string;
  category: string;
  parameters?: { [key: string]: any };
  returnType: string;
  examples?: string[];
  deprecated?: boolean;
  syntax?: string;
}

export class ShopifyFilterRegistry {
  private filters: { [key: string]: ShopifyFilterDefinition } = {};

  constructor() {
    this.initializeFilters();
  }

  getFilter(name: string): ShopifyFilterDefinition | null {
    return this.filters[name] || null;
  }

  getAllFilters(): { [key: string]: ShopifyFilterDefinition } {
    return this.filters;
  }

  getFiltersByCategory(category: string): {
    [key: string]: ShopifyFilterDefinition;
  } {
    const result: { [key: string]: ShopifyFilterDefinition } = {};
    Object.keys(this.filters).forEach((key) => {
      if (this.filters[key].category === category) {
        result[key] = this.filters[key];
      }
    });
    return result;
  }

  private initializeFilters() {
    this.filters = {
      // Array Filters
      compact: {
        name: "compact",
        description: "Removes any nil items from an array",
        category: "Array",
        returnType: "array",
        syntax: "array | compact",
        examples: [
          "{{ collection.products | map: 'compare_at_price' | compact }}",
        ],
      },

      concat: {
        name: "concat",
        description: "Concatenates (combines) two arrays",
        category: "Array",
        returnType: "array",
        syntax: "array | concat: array",
        parameters: {
          array: { type: "array", description: "Array to concatenate with" },
        },
        examples: [
          "{{ collection.all_types | concat: collection.all_vendors }}",
        ],
      },

      find: {
        name: "find",
        description:
          "Returns the first item in an array with a specific property value",
        category: "Array",
        returnType: "object",
        syntax: "array | find: property, value",
        parameters: {
          property: { type: "string", description: "Property name to search" },
          value: { type: "string", description: "Value to match" },
        },
        examples: ["{{ collection.products | find: 'available', true }}"],
      },

      find_index: {
        name: "find_index",
        description:
          "Returns the index of the first item in an array with a specific property value",
        category: "Array",
        returnType: "number",
        syntax: "array | find_index: property, value",
        parameters: {
          property: { type: "string", description: "Property name to search" },
          value: { type: "string", description: "Value to match" },
        },
      },

      first: {
        name: "first",
        description: "Returns the first item in an array",
        category: "Array",
        returnType: "any",
        syntax: "array | first",
        examples: ["{{ collection.products | first }}"],
      },

      has: {
        name: "has",
        description:
          "Tests if any item in an array has a specific property value",
        category: "Array",
        returnType: "boolean",
        syntax: "array | has: property, value",
        parameters: {
          property: { type: "string", description: "Property name to test" },
          value: { type: "string", description: "Value to match" },
        },
      },

      join: {
        name: "join",
        description:
          "Combines all of the items in an array into a single string, separated by a space",
        category: "Array",
        returnType: "string",
        syntax: "array | join: separator",
        parameters: {
          separator: {
            type: "string",
            description: "Custom separator (optional)",
            default: " ",
          },
        },
        examples: ["{{ product.tags | join: ', ' }}"],
      },

      last: {
        name: "last",
        description: "Returns the last item in an array",
        category: "Array",
        returnType: "any",
        syntax: "array | last",
        examples: ["{{ collection.products | last }}"],
      },

      map: {
        name: "map",
        description:
          "Creates an array of values from a specific property of the items in an array",
        category: "Array",
        returnType: "array",
        syntax: "array | map: property",
        parameters: {
          property: { type: "string", description: "Property to extract" },
        },
        examples: ["{{ collection.products | map: 'title' }}"],
      },

      reject: {
        name: "reject",
        description:
          "Filters an array to exclude items with a specific property value",
        category: "Array",
        returnType: "array",
        syntax: "array | reject: property, value",
        parameters: {
          property: { type: "string", description: "Property name to filter" },
          value: { type: "string", description: "Value to reject" },
        },
      },

      reverse: {
        name: "reverse",
        description: "Reverses the order of the items in an array",
        category: "Array",
        returnType: "array",
        syntax: "array | reverse",
        examples: ["{{ collection.products | reverse }}"],
      },

      size: {
        name: "size",
        description: "Returns the size of a string or array",
        category: "Array",
        returnType: "number",
        syntax: "array | size",
        examples: ["{{ collection.products | size }}"],
      },

      sort: {
        name: "sort",
        description:
          "Sorts the items in an array in case-sensitive alphabetical or numerical order",
        category: "Array",
        returnType: "array",
        syntax: "array | sort: property",
        parameters: {
          property: {
            type: "string",
            description: "Property to sort by (optional)",
          },
        },
        examples: ["{{ collection.products | sort: 'title' }}"],
      },

      sort_natural: {
        name: "sort_natural",
        description:
          "Sorts the items in an array in case-insensitive alphabetical order",
        category: "Array",
        returnType: "array",
        syntax: "array | sort_natural: property",
        parameters: {
          property: {
            type: "string",
            description: "Property to sort by (optional)",
          },
        },
      },

      sum: {
        name: "sum",
        description: "Returns the sum of all elements in an array",
        category: "Array",
        returnType: "number",
        syntax: "array | sum: property",
        parameters: {
          property: {
            type: "string",
            description: "Property to sum (optional)",
          },
        },
        examples: ["{{ cart.items | sum: 'quantity' }}"],
      },

      uniq: {
        name: "uniq",
        description: "Removes any duplicate items in an array",
        category: "Array",
        returnType: "array",
        syntax: "array | uniq",
        examples: ["{{ collection.all_tags | uniq }}"],
      },

      where: {
        name: "where",
        description:
          "Filters an array to include only items with a specific property value",
        category: "Array",
        returnType: "array",
        syntax: "array | where: property, value",
        parameters: {
          property: { type: "string", description: "Property name to filter" },
          value: {
            type: "string",
            description: "Value to match (optional for boolean)",
          },
        },
        examples: ["{{ collection.products | where: 'available' }}"],
      },

      // Cart Filters
      item_count_for_variant: {
        name: "item_count_for_variant",
        description:
          "Returns the total item count for a specified variant in the cart",
        category: "Cart",
        returnType: "number",
        syntax: "cart | item_count_for_variant: variant_id",
        parameters: {
          variant_id: { type: "number", description: "Variant ID" },
        },
        examples: ["{{ cart | item_count_for_variant: 39888235757633 }}"],
      },

      line_items_for: {
        name: "line_items_for",
        description:
          "Returns the subset of cart line items that include a specified product or variant",
        category: "Cart",
        returnType: "array<line_item>",
        syntax: "cart | line_items_for: object",
        parameters: {
          object: {
            type: "product|variant",
            description: "Product or variant object",
          },
        },
        examples: ["{{ cart | line_items_for: product }}"],
      },

      // Collection Filters
      highlight_active_tag: {
        name: "highlight_active_tag",
        description:
          "Wraps a given tag in an HTML <span> tag with class 'active' if the tag is currently active",
        category: "Collection",
        returnType: "string",
        syntax: "string | highlight_active_tag",
        examples: ["{{ tag | highlight_active_tag | link_to_tag: tag }}"],
      },

      link_to_type: {
        name: "link_to_type",
        description:
          "Generates an HTML <a> tag linking to a collection page that lists all products of the given product type",
        category: "Collection",
        returnType: "string",
        syntax: "string | link_to_type: attributes",
        parameters: {
          class: { type: "string", description: "CSS class attribute" },
          id: { type: "string", description: "HTML id attribute" },
        },
        examples: ["{{ 'Health' | link_to_type }}"],
      },

      link_to_vendor: {
        name: "link_to_vendor",
        description:
          "Generates an HTML <a> tag linking to a collection page that lists all products of a given product vendor",
        category: "Collection",
        returnType: "string",
        syntax: "string | link_to_vendor: attributes",
        parameters: {
          class: { type: "string", description: "CSS class attribute" },
          id: { type: "string", description: "HTML id attribute" },
        },
        examples: ['{{ "Polina\'s Potent Potions" | link_to_vendor }}'],
      },

      sort_by: {
        name: "sort_by",
        description:
          "Generates a collection URL with the provided sort_by parameter appended",
        category: "Collection",
        returnType: "string",
        syntax: "string | sort_by: option",
        parameters: {
          option: {
            type: "string",
            description: "Sort option",
            values: [
              "manual",
              "best-selling",
              "title-ascending",
              "title-descending",
              "price-ascending",
              "price-descending",
              "created-ascending",
              "created-descending",
            ],
          },
        },
        examples: ["{{ collection.url | sort_by: 'best-selling' }}"],
      },

      url_for_type: {
        name: "url_for_type",
        description:
          "Generates a URL for a collection page that lists all products of the given product type",
        category: "Collection",
        returnType: "string",
        syntax: "string | url_for_type",
        examples: ["{{ 'health' | url_for_type }}"],
      },

      url_for_vendor: {
        name: "url_for_vendor",
        description:
          "Generates a URL for a collection page that lists all products from the given product vendor",
        category: "Collection",
        returnType: "string",
        syntax: "string | url_for_vendor",
        examples: ['{{ "Polina\'s Potent Potions" | url_for_vendor }}'],
      },

      within: {
        name: "within",
        description:
          "Generates a product URL within the context of the provided collection",
        category: "Collection",
        returnType: "string",
        syntax: "string | within: collection",
        parameters: {
          collection: { type: "collection", description: "Collection context" },
        },
      },

      // Color Filters
      brightness_difference: {
        name: "brightness_difference",
        description:
          "Calculates the perceived brightness difference between two colors",
        category: "Color",
        returnType: "number",
        syntax: "string | brightness_difference: color",
        parameters: {
          color: { type: "string", description: "Second color to compare" },
        },
        examples: ["{{ '#E800B0' | brightness_difference: '#FECEE9' }}"],
      },

      color_brightness: {
        name: "color_brightness",
        description: "Calculates the perceived brightness of a given color",
        category: "Color",
        returnType: "number",
        syntax: "string | color_brightness",
        examples: ["{{ '#EA5AB9' | color_brightness }}"],
      },

      color_contrast: {
        name: "color_contrast",
        description:
          "Calculates the contrast ratio between two colors and returns the ratio's numerator",
        category: "Color",
        returnType: "number",
        syntax: "string | color_contrast: color",
        parameters: {
          color: { type: "string", description: "Second color to compare" },
        },
      },

      color_darken: {
        name: "color_darken",
        description: "Darkens a given color by a specific percentage",
        category: "Color",
        returnType: "string",
        syntax: "string | color_darken: percentage",
        parameters: {
          percentage: {
            type: "number",
            description: "Percentage to darken (0-100)",
          },
        },
      },

      color_desaturate: {
        name: "color_desaturate",
        description: "Desaturates a given color by a specific percentage",
        category: "Color",
        returnType: "string",
        syntax: "string | color_desaturate: percentage",
        parameters: {
          percentage: {
            type: "number",
            description: "Percentage to desaturate (0-100)",
          },
        },
      },

      color_difference: {
        name: "color_difference",
        description: "Calculates the color difference between two colors",
        category: "Color",
        returnType: "number",
        syntax: "string | color_difference: color",
        parameters: {
          color: { type: "string", description: "Second color to compare" },
        },
      },

      color_extract: {
        name: "color_extract",
        description: "Extracts a specific color component from a given color",
        category: "Color",
        returnType: "number",
        syntax: "string | color_extract: component",
        parameters: {
          component: {
            type: "string",
            description: "Color component",
            values: [
              "alpha",
              "red",
              "green",
              "blue",
              "hue",
              "saturation",
              "lightness",
            ],
          },
        },
      },

      color_lighten: {
        name: "color_lighten",
        description: "Lightens a given color by a specific percentage",
        category: "Color",
        returnType: "string",
        syntax: "string | color_lighten: percentage",
        parameters: {
          percentage: {
            type: "number",
            description: "Percentage to lighten (0-100)",
          },
        },
      },

      color_mix: {
        name: "color_mix",
        description:
          "Blends two colors together by a specific percentage factor",
        category: "Color",
        returnType: "string",
        syntax: "string | color_mix: color, percentage",
        parameters: {
          color: { type: "string", description: "Color to mix with" },
          percentage: {
            type: "number",
            description: "Blend percentage (0-100)",
          },
        },
      },

      color_modify: {
        name: "color_modify",
        description:
          "Modifies a specific color component of a given color by a specific amount",
        category: "Color",
        returnType: "string",
        syntax: "string | color_modify: component, value",
        parameters: {
          component: {
            type: "string",
            description: "Color component",
            values: [
              "red",
              "green",
              "blue",
              "alpha",
              "hue",
              "saturation",
              "lightness",
            ],
          },
          value: { type: "number", description: "Modification value" },
        },
      },

      color_saturate: {
        name: "color_saturate",
        description: "Saturates a given color by a specific percentage",
        category: "Color",
        returnType: "string",
        syntax: "string | color_saturate: percentage",
        parameters: {
          percentage: {
            type: "number",
            description: "Percentage to saturate (0-100)",
          },
        },
      },

      color_to_hex: {
        name: "color_to_hex",
        description: "Converts a CSS color string to hexadecimal format (hex6)",
        category: "Color",
        returnType: "string",
        syntax: "string | color_to_hex",
      },

      color_to_hsl: {
        name: "color_to_hsl",
        description: "Converts a CSS color string to HSL format",
        category: "Color",
        returnType: "string",
        syntax: "string | color_to_hsl",
      },

      color_to_oklch: {
        name: "color_to_oklch",
        description: "Converts a CSS color string to OKLCH format",
        category: "Color",
        returnType: "string",
        syntax: "string | color_to_oklch",
      },

      color_to_rgb: {
        name: "color_to_rgb",
        description: "Converts a CSS color string to RGB format",
        category: "Color",
        returnType: "string",
        syntax: "string | color_to_rgb",
      },

      hex_to_rgba: {
        name: "hex_to_rgba",
        description:
          "Converts a CSS color string from hexadecimal format to RGBA format",
        category: "Color",
        returnType: "string",
        syntax: "string | hex_to_rgba: alpha",
        deprecated: true,
        parameters: {
          alpha: {
            type: "number",
            description: "Alpha value (0.0-1.0)",
            default: "1.0",
          },
        },
      },

      // Customer Filters
      avatar: {
        name: "avatar",
        description:
          "Generates HTML to render a customer's avatar, if available",
        category: "Customer",
        returnType: "string",
        syntax: "customer | avatar",
        examples: ["{{ customer | avatar }}"],
      },

      customer_login_link: {
        name: "customer_login_link",
        description: "Generates an HTML link to the customer login page",
        category: "Customer",
        returnType: "string",
        syntax: "string | customer_login_link",
        examples: ["{{ 'Log in' | customer_login_link }}"],
      },

      customer_logout_link: {
        name: "customer_logout_link",
        description:
          "Generates an HTML link to log the customer out of their account",
        category: "Customer",
        returnType: "string",
        syntax: "string | customer_logout_link",
      },

      customer_register_link: {
        name: "customer_register_link",
        description: "Generates an HTML link to the customer registration page",
        category: "Customer",
        returnType: "string",
        syntax: "string | customer_register_link",
      },

      login_button: {
        name: "login_button",
        description:
          "Generates an HTML Button that enables a customer to sign in to the storefront using their Shop account",
        category: "Customer",
        returnType: "string",
        syntax: "shop | login_button: action",
        parameters: {
          action: {
            type: "string",
            description: "Button behavior",
            values: ["default", "follow"],
            default: "default",
          },
        },
      },

      // Default Filters
      default: {
        name: "default",
        description:
          "Sets a default value for any variable whose value is empty, false, or nil",
        category: "Default",
        returnType: "any",
        syntax: "variable | default: value, allow_false: boolean",
        parameters: {
          value: { type: "any", description: "Default value" },
          allow_false: {
            type: "boolean",
            description: "Allow false values",
            default: false,
          },
        },
        examples: ["{{ product.selected_variant.url | default: product.url }}"],
      },

      default_errors: {
        name: "default_errors",
        description:
          "Generates default error messages for each possible value of form.errors",
        category: "Default",
        returnType: "string",
        syntax: "string | default_errors",
      },

      default_pagination: {
        name: "default_pagination",
        description: "Generates HTML for a set of links for paginated results",
        category: "Default",
        returnType: "string",
        syntax: "paginate | default_pagination: previous, next, anchor",
        parameters: {
          previous: { type: "string", description: "Previous page link text" },
          next: { type: "string", description: "Next page link text" },
          anchor: {
            type: "string",
            description: "Anchor to add to pagination links",
          },
        },
      },

      // Font Filters
      font_face: {
        name: "font_face",
        description:
          "Generates a CSS @font-face declaration to load the provided font",
        category: "Font",
        returnType: "string",
        syntax: "font | font_face: font_display",
        parameters: {
          font_display: {
            type: "string",
            description: "Font display property",
          },
        },
        examples: ["{{ settings.type_header_font | font_face }}"],
      },

      font_modify: {
        name: "font_modify",
        description: "Modifies a specific property of a given font",
        category: "Font",
        returnType: "font",
        syntax: "font | font_modify: property, value",
        parameters: {
          property: {
            type: "string",
            description: "Font property",
            values: ["style", "weight"],
          },
          value: { type: "string", description: "Property value" },
        },
      },

      font_url: {
        name: "font_url",
        description:
          "Returns the CDN URL for the provided font in woff2 format",
        category: "Font",
        returnType: "string",
        syntax: "font | font_url: format",
        parameters: {
          format: {
            type: "string",
            description: "Font format",
            values: ["woff", "woff2"],
            default: "woff2",
          },
        },
      },

      // Format Filters
      date: {
        name: "date",
        description: "Converts a timestamp into another date format",
        category: "Format",
        returnType: "string",
        syntax: "string | date: format",
        parameters: {
          format: {
            type: "string",
            description: "Date format string or locale format",
          },
        },
        examples: ["{{ article.created_at | date: '%B %d, %Y' }}"],
      },

      json: {
        name: "json",
        description: "Converts a string or object into JSON format",
        category: "Format",
        returnType: "string",
        syntax: "object | json",
        examples: ["{{ product | json }}"],
      },

      structured_data: {
        name: "structured_data",
        description:
          "Converts an object into a schema.org structured data format",
        category: "Format",
        returnType: "string",
        syntax: "object | structured_data",
      },

      unit_price_with_measurement: {
        name: "unit_price_with_measurement",
        description:
          "Formats a given unit price and measurement based on the store's HTML without currency setting",
        category: "Format",
        returnType: "string",
        syntax: "variant | unit_price_with_measurement: formatted_unit_price",
        parameters: {
          formatted_unit_price: {
            type: "string",
            description: "Formatted unit price using money filters",
          },
        },
      },

      weight_with_unit: {
        name: "weight_with_unit",
        description: "Generates a formatted weight for a variant object",
        category: "Format",
        returnType: "string",
        syntax: "variant | weight_with_unit: unit",
        parameters: {
          unit: { type: "string", description: "Override default unit" },
        },
      },

      // HTML Filters
      class_list: {
        name: "class_list",
        description:
          "Generates the list of style classes for a style setting or a collection of settings",
        category: "HTML",
        returnType: "string",
        syntax: "settings.layout | class_list",
      },

      highlight: {
        name: "highlight",
        description:
          "Wraps all instances of a specific string with an HTML <strong> tag with class 'highlight'",
        category: "HTML",
        returnType: "string",
        syntax: "string | highlight: search_terms",
        parameters: {
          search_terms: { type: "string", description: "Terms to highlight" },
        },
        examples: ["{{ item.description | highlight: search.terms }}"],
      },

      inline_asset_content: {
        name: "inline_asset_content",
        description: "Outputs the content of an asset inline in the template",
        category: "HTML",
        returnType: "string",
        syntax: "asset_url | inline_asset_content",
      },

      link_to: {
        name: "link_to",
        description: "Generates an HTML <a> tag",
        category: "HTML",
        returnType: "string",
        syntax: "string | link_to: url, attributes",
        parameters: {
          url: { type: "string", description: "Link URL" },
          class: { type: "string", description: "CSS class" },
          id: { type: "string", description: "HTML id" },
          title: { type: "string", description: "Title attribute" },
        },
      },

      placeholder_svg_tag: {
        name: "placeholder_svg_tag",
        description: "Generates an HTML <svg> tag for a given placeholder name",
        category: "HTML",
        returnType: "string",
        syntax: "string | placeholder_svg_tag: class",
        parameters: {
          class: { type: "string", description: "CSS class for svg tag" },
          placeholder: {
            type: "string",
            description: "Placeholder name",
            values: [
              "product-1",
              "product-2",
              "product-3",
              "product-4",
              "product-5",
              "product-6",
              "collection-1",
              "collection-2",
              "collection-3",
              "collection-4",
              "collection-5",
              "collection-6",
              "lifestyle-1",
              "lifestyle-2",
              "image",
            ],
          },
        },
      },

      preload_tag: {
        name: "preload_tag",
        description:
          "Generates an HTML <link> tag with rel='preload' to prioritize loading a Shopify-hosted asset",
        category: "HTML",
        returnType: "string",
        syntax: "asset_url | preload_tag: as, attributes",
        parameters: {
          as: {
            type: "string",
            description: "Resource type (style, script, font, etc.)",
          },
          crossorigin: { type: "string", description: "CORS setting" },
        },
      },

      script_tag: {
        name: "script_tag",
        description: "Generates an HTML <script> tag for a given resource URL",
        category: "HTML",
        returnType: "string",
        syntax: "asset_url | script_tag",
      },

      stylesheet_tag: {
        name: "stylesheet_tag",
        description: "Generates an HTML <link> tag for a given resource URL",
        category: "HTML",
        returnType: "string",
        syntax: "asset_url | stylesheet_tag: preload",
        parameters: {
          preload: {
            type: "boolean",
            description: "Whether to preload the stylesheet",
          },
        },
      },

      time_tag: {
        name: "time_tag",
        description: "Converts a timestamp into an HTML <time> tag",
        category: "HTML",
        returnType: "string",
        syntax: "timestamp | time_tag: format, datetime",
        parameters: {
          format: { type: "string", description: "Date format" },
          datetime: {
            type: "string",
            description: "Custom datetime attribute format",
          },
        },
      },

      // Hosted File Filters
      asset_img_url: {
        name: "asset_img_url",
        description:
          "Returns the CDN URL for an image in the assets directory of a theme",
        category: "Hosted File",
        returnType: "string",
        syntax: "string | asset_img_url: size",
        parameters: {
          size: {
            type: "string",
            description: "Image size",
            values: [
              "pico",
              "icon",
              "thumb",
              "small",
              "compact",
              "medium",
              "large",
              "grande",
              "master",
            ],
            default: "small",
          },
        },
        examples: ["{{ 'red-and-black-bramble-berries.jpg' | asset_img_url }}"],
      },

      asset_url: {
        name: "asset_url",
        description:
          "Returns the CDN URL for a file in the assets directory of a theme",
        category: "Hosted File",
        returnType: "string",
        syntax: "string | asset_url",
        examples: ["{{ 'cart.js' | asset_url }}"],
      },

      file_img_url: {
        name: "file_img_url",
        description:
          "Returns the CDN URL for an image from the Files page of the Shopify admin",
        category: "Hosted File",
        returnType: "string",
        syntax: "file | file_img_url: size",
        parameters: {
          size: {
            type: "string",
            description: "Image size",
            default: "small",
          },
        },
      },

      file_url: {
        name: "file_url",
        description:
          "Returns the CDN URL for a file from the Files page of the Shopify admin",
        category: "Hosted File",
        returnType: "string",
        syntax: "file | file_url",
      },

      global_asset_url: {
        name: "global_asset_url",
        description: "Returns the CDN URL for a global asset",
        category: "Hosted File",
        returnType: "string",
        syntax: "string | global_asset_url",
      },

      shopify_asset_url: {
        name: "shopify_asset_url",
        description:
          "Returns the CDN URL for a globally accessible Shopify asset",
        category: "Hosted File",
        returnType: "string",
        syntax: "string | shopify_asset_url",
      },

      // Localization Filters
      currency_selector: {
        name: "currency_selector",
        description:
          "Generates an HTML <select> element with an option for each currency available on the store",
        category: "Localization",
        returnType: "string",
        syntax: "form | currency_selector: class, id",
        deprecated: true,
        parameters: {
          class: {
            type: "string",
            description: "CSS class for select element",
          },
          id: { type: "string", description: "HTML id for select element" },
        },
      },

      format_address: {
        name: "format_address",
        description:
          "Generates an HTML address display, with each address component ordered according to the address's locale",
        category: "Localization",
        returnType: "string",
        syntax: "address | format_address",
      },

      translate: {
        name: "translate",
        description:
          "Returns a string of translated text for a given translation key from a locale file. Alias: t",
        category: "Localization",
        returnType: "string",
        syntax: "string | translate: variables",
        parameters: {
          variables: {
            type: "object",
            description: "Variables for translation interpolation",
          },
        },
      },

      t: {
        name: "t",
        description:
          "Alias for translate filter. Returns translated text for a given translation key",
        category: "Localization",
        returnType: "string",
        syntax: "string | t: variables",
        parameters: {
          variables: {
            type: "object",
            description: "Variables for translation interpolation",
          },
        },
      },

      // Math Filters
      abs: {
        name: "abs",
        description: "Returns the absolute value of a number",
        category: "Math",
        returnType: "number",
        syntax: "number | abs",
        examples: ["{{ -3 | abs }}"],
      },

      at_least: {
        name: "at_least",
        description: "Limits a number to a minimum value",
        category: "Math",
        returnType: "number",
        syntax: "number | at_least: minimum",
        parameters: {
          minimum: { type: "number", description: "Minimum value" },
        },
        examples: ["{{ 4 | at_least: 5 }}"],
      },

      at_most: {
        name: "at_most",
        description: "Limits a number to a maximum value",
        category: "Math",
        returnType: "number",
        syntax: "number | at_most: maximum",
        parameters: {
          maximum: { type: "number", description: "Maximum value" },
        },
        examples: ["{{ 6 | at_most: 5 }}"],
      },

      ceil: {
        name: "ceil",
        description: "Rounds a number up to the nearest integer",
        category: "Math",
        returnType: "number",
        syntax: "number | ceil",
      },

      divided_by: {
        name: "divided_by",
        description: "Divides a number by a given number",
        category: "Math",
        returnType: "number",
        syntax: "number | divided_by: divisor",
        parameters: {
          divisor: { type: "number", description: "Number to divide by" },
        },
      },

      floor: {
        name: "floor",
        description: "Rounds a number down to the nearest integer",
        category: "Math",
        returnType: "number",
        syntax: "number | floor",
      },

      minus: {
        name: "minus",
        description: "Subtracts a given number from another number",
        category: "Math",
        returnType: "number",
        syntax: "number | minus: subtrahend",
        parameters: {
          subtrahend: { type: "number", description: "Number to subtract" },
        },
      },

      modulo: {
        name: "modulo",
        description:
          "Returns the remainder of dividing a number by a given number",
        category: "Math",
        returnType: "number",
        syntax: "number | modulo: divisor",
        parameters: {
          divisor: { type: "number", description: "Number to divide by" },
        },
      },

      plus: {
        name: "plus",
        description: "Adds two numbers",
        category: "Math",
        returnType: "number",
        syntax: "number | plus: addend",
        parameters: {
          addend: { type: "number", description: "Number to add" },
        },
      },

      round: {
        name: "round",
        description:
          "Rounds a number to the nearest integer or specified decimal places",
        category: "Math",
        returnType: "number",
        syntax: "number | round: decimal_places",
        parameters: {
          decimal_places: {
            type: "number",
            description: "Number of decimal places",
          },
        },
      },

      times: {
        name: "times",
        description: "Multiplies a number by a given number",
        category: "Math",
        returnType: "number",
        syntax: "number | times: multiplier",
        parameters: {
          multiplier: { type: "number", description: "Number to multiply by" },
        },
      },

      // Media Filters
      article_img_url: {
        name: "article_img_url",
        description: "Returns the CDN URL for an article's image",
        category: "Media",
        returnType: "string",
        syntax: "article.image | article_img_url: size",
        deprecated: true,
        parameters: {
          size: { type: "string", description: "Image size", default: "small" },
        },
      },

      collection_img_url: {
        name: "collection_img_url",
        description: "Returns the CDN URL for a collection's image",
        category: "Media",
        returnType: "string",
        syntax: "collection.image | collection_img_url: size",
        deprecated: true,
        parameters: {
          size: { type: "string", description: "Image size", default: "small" },
        },
      },

      external_video_tag: {
        name: "external_video_tag",
        description:
          "Generates an HTML <iframe> tag containing the player for a given external video",
        category: "Media",
        returnType: "string",
        syntax: "external_video | external_video_tag: attributes",
        parameters: {
          class: { type: "string", description: "CSS class" },
          width: { type: "number", description: "Video width" },
          height: { type: "number", description: "Video height" },
        },
      },

      external_video_url: {
        name: "external_video_url",
        description:
          "Returns the URL for a given external video with specified parameters",
        category: "Media",
        returnType: "string",
        syntax: "external_video | external_video_url: parameters",
      },

      image_tag: {
        name: "image_tag",
        description: "Generates an HTML <img> tag for a given image_url",
        category: "Media",
        returnType: "string",
        syntax: "image_url | image_tag: attributes",
        parameters: {
          width: { type: "number", description: "Image width" },
          height: { type: "number", description: "Image height" },
          alt: { type: "string", description: "Alt text" },
          class: { type: "string", description: "CSS class" },
          sizes: { type: "string", description: "Responsive sizes attribute" },
          widths: {
            type: "string",
            description: "Comma-separated list of widths for srcset",
          },
          preload: {
            type: "boolean",
            description: "Whether to preload the image",
          },
          loading: {
            type: "string",
            description: "Loading attribute (lazy/eager)",
          },
        },
      },

      image_url: {
        name: "image_url",
        description: "Returns the CDN URL for an image",
        category: "Media",
        returnType: "string",
        syntax: "image | image_url: width, height, crop, format, pad_color",
        parameters: {
          width: { type: "number", description: "Image width (max 5760px)" },
          height: { type: "number", description: "Image height (max 5760px)" },
          crop: {
            type: "string",
            description: "Crop position",
            values: ["top", "center", "bottom", "left", "right", "region"],
            default: "center",
          },
          format: {
            type: "string",
            description: "File format",
            values: ["jpg", "pjpg"],
          },
          pad_color: { type: "string", description: "Hex color for padding" },
        },
      },

      img_tag: {
        name: "img_tag",
        description: "Generates an HTML <img> tag for a given image URL",
        category: "Media",
        returnType: "string",
        syntax: "image | img_tag: alt, class, size",
        deprecated: true,
        parameters: {
          alt: { type: "string", description: "Alt text" },
          class: { type: "string", description: "CSS class" },
          size: { type: "string", description: "Image size" },
        },
      },

      img_url: {
        name: "img_url",
        description: "Returns the CDN URL for an image",
        category: "Media",
        returnType: "string",
        syntax: "image | img_url: size, crop, format, scale",
        deprecated: true,
        parameters: {
          size: { type: "string", description: "Image size" },
          crop: { type: "string", description: "Crop position" },
          format: { type: "string", description: "File format" },
          scale: { type: "number", description: "Pixel density (2 or 3)" },
        },
      },

      media_tag: {
        name: "media_tag",
        description:
          "Generates an appropriate HTML tag for a given media object",
        category: "Media",
        returnType: "string",
        syntax: "media | media_tag: image_size",
        parameters: {
          image_size: {
            type: "string",
            description: "Dimensions of media's poster image",
          },
        },
      },

      model_viewer_tag: {
        name: "model_viewer_tag",
        description:
          "Generates a Google model viewer component for a given 3D model",
        category: "Media",
        returnType: "string",
        syntax: "model | model_viewer_tag: image_size, attributes",
        parameters: {
          image_size: {
            type: "string",
            description: "Dimensions of model's poster image",
          },
        },
      },

      product_img_url: {
        name: "product_img_url",
        description: "Returns the CDN URL for a product image",
        category: "Media",
        returnType: "string",
        syntax: "product_image | product_img_url: size",
        deprecated: true,
        parameters: {
          size: { type: "string", description: "Image size", default: "small" },
        },
      },

      video_tag: {
        name: "video_tag",
        description: "Generates an HTML <video> tag for a given video",
        category: "Media",
        returnType: "string",
        syntax: "video | video_tag: attributes",
        parameters: {
          image_size: {
            type: "string",
            description: "Dimensions of video's poster image",
          },
          autoplay: { type: "boolean", description: "Auto-play video" },
          loop: { type: "boolean", description: "Loop video" },
          muted: { type: "boolean", description: "Mute video audio" },
          controls: { type: "boolean", description: "Show video controls" },
        },
      },

      // Metafield Filters
      metafield_tag: {
        name: "metafield_tag",
        description: "Generates an HTML element to host the metafield data",
        category: "Metafield",
        returnType: "string",
        syntax: "metafield | metafield_tag: field, list_format",
        parameters: {
          field: {
            type: "string",
            description: "Field to render for metaobject references",
          },
          list_format: {
            type: "string",
            description: "List format",
            values: ["unordered", "ordered"],
            default: "unordered",
          },
        },
      },

      metafield_text: {
        name: "metafield_text",
        description: "Generates a text version of the metafield data",
        category: "Metafield",
        returnType: "string",
        syntax: "metafield | metafield_text: field",
        parameters: {
          field: {
            type: "string",
            description: "Field to render for metaobject references",
          },
        },
      },

      // Money Filters
      money: {
        name: "money",
        description:
          "Formats a given price based on the store's HTML without currency setting",
        category: "Money",
        returnType: "string",
        syntax: "number | money",
        examples: ["{{ product.price | money }}"],
      },

      money_with_currency: {
        name: "money_with_currency",
        description:
          "Formats a given price based on the store's HTML with currency setting",
        category: "Money",
        returnType: "string",
        syntax: "number | money_with_currency",
        examples: ["{{ product.price | money_with_currency }}"],
      },

      money_without_currency: {
        name: "money_without_currency",
        description:
          "Formats a given price based on the store's HTML without currency setting, without the currency symbol",
        category: "Money",
        returnType: "string",
        syntax: "number | money_without_currency",
      },

      money_without_trailing_zeros: {
        name: "money_without_trailing_zeros",
        description:
          "Formats a given price excluding the decimal separator and trailing zeros",
        category: "Money",
        returnType: "string",
        syntax: "number | money_without_trailing_zeros",
      },

      // Payment Filters
      payment_button: {
        name: "payment_button",
        description:
          "Generates an HTML container to host accelerated checkout buttons for a product",
        category: "Payment",
        returnType: "string",
        syntax: "form | payment_button",
      },

      payment_terms: {
        name: "payment_terms",
        description: "Generates the HTML for the Shop Pay Installments banner",
        category: "Payment",
        returnType: "string",
        syntax: "form | payment_terms",
      },

      payment_type_img_url: {
        name: "payment_type_img_url",
        description: "Returns the URL for an SVG image of a given payment type",
        category: "Payment",
        returnType: "string",
        syntax: "payment_type | payment_type_img_url",
        examples: ["{{ type | payment_type_img_url }}"],
      },

      payment_type_svg_tag: {
        name: "payment_type_svg_tag",
        description: "Generates an HTML <svg> tag for a given payment type",
        category: "Payment",
        returnType: "string",
        syntax: "payment_type | payment_type_svg_tag",
      },

      // String Filters
      append: {
        name: "append",
        description: "Adds a given string to the end of a string",
        category: "String",
        returnType: "string",
        syntax: "string | append: suffix",
        parameters: {
          suffix: { type: "string", description: "String to append" },
        },
        examples: ["{{ request.origin | append: product.url }}"],
      },

      base64_decode: {
        name: "base64_decode",
        description: "Decodes a string in Base64 format",
        category: "String",
        returnType: "string",
        syntax: "string | base64_decode",
        examples: ["{{ 'b25lIHR3byB0aHJlZQ==' | base64_decode }}"],
      },

      base64_encode: {
        name: "base64_encode",
        description: "Encodes a string to Base64 format",
        category: "String",
        returnType: "string",
        syntax: "string | base64_encode",
        examples: ["{{ 'one two three' | base64_encode }}"],
      },

      base64_url_safe_decode: {
        name: "base64_url_safe_decode",
        description: "Decodes a string in URL-safe Base64 format",
        category: "String",
        returnType: "string",
        syntax: "string | base64_url_safe_decode",
      },

      base64_url_safe_encode: {
        name: "base64_url_safe_encode",
        description: "Encodes a string to URL-safe Base64 format",
        category: "String",
        returnType: "string",
        syntax: "string | base64_url_safe_encode",
      },

      camelize: {
        name: "camelize",
        description: "Converts a string to CamelCase",
        category: "String",
        returnType: "string",
        syntax: "string | camelize",
      },

      capitalize: {
        name: "capitalize",
        description:
          "Capitalizes the first word in a string and downcases the remaining characters",
        category: "String",
        returnType: "string",
        syntax: "string | capitalize",
      },

      downcase: {
        name: "downcase",
        description: "Converts a string to all lowercase characters",
        category: "String",
        returnType: "string",
        syntax: "string | downcase",
      },

      escape: {
        name: "escape",
        description: "Escapes special characters in HTML",
        category: "String",
        returnType: "string",
        syntax: "string | escape",
      },

      escape_once: {
        name: "escape_once",
        description:
          "Escapes a string without changing characters that have already been escaped",
        category: "String",
        returnType: "string",
        syntax: "string | escape_once",
      },

      handleize: {
        name: "handleize",
        description: "Converts a string into a handle",
        category: "String",
        returnType: "string",
        syntax: "string | handleize",
      },

      handle: {
        name: "handle",
        description:
          "Alias for handleize filter. Converts a string into a handle",
        category: "String",
        returnType: "string",
        syntax: "string | handle",
      },

      hmac_sha1: {
        name: "hmac_sha1",
        description: "Converts a string into an SHA-1 hash using HMAC",
        category: "String",
        returnType: "string",
        syntax: "string | hmac_sha1: secret_key",
        parameters: {
          secret_key: { type: "string", description: "Secret key for HMAC" },
        },
      },

      hmac_sha256: {
        name: "hmac_sha256",
        description: "Converts a string into an SHA-256 hash using HMAC",
        category: "String",
        returnType: "string",
        syntax: "string | hmac_sha256: secret_key",
        parameters: {
          secret_key: { type: "string", description: "Secret key for HMAC" },
        },
      },

      lstrip: {
        name: "lstrip",
        description: "Strips all whitespace from the left of a string",
        category: "String",
        returnType: "string",
        syntax: "string | lstrip",
      },

      md5: {
        name: "md5",
        description: "Converts a string into an MD5 hash",
        category: "String",
        returnType: "string",
        syntax: "string | md5",
      },

      newline_to_br: {
        name: "newline_to_br",
        description:
          "Converts newlines (\\n) in a string to HTML line breaks (<br>)",
        category: "String",
        returnType: "string",
        syntax: "string | newline_to_br",
      },

      pluralize: {
        name: "pluralize",
        description:
          "Outputs the singular or plural version of a string based on a given number",
        category: "String",
        returnType: "string",
        syntax: "number | pluralize: singular, plural",
        parameters: {
          singular: { type: "string", description: "Singular form" },
          plural: { type: "string", description: "Plural form" },
        },
      },

      prepend: {
        name: "prepend",
        description: "Adds a given string to the beginning of a string",
        category: "String",
        returnType: "string",
        syntax: "string | prepend: prefix",
        parameters: {
          prefix: { type: "string", description: "String to prepend" },
        },
      },

      remove: {
        name: "remove",
        description: "Removes any instance of a substring inside a string",
        category: "String",
        returnType: "string",
        syntax: "string | remove: substring",
        parameters: {
          substring: { type: "string", description: "Substring to remove" },
        },
      },

      remove_first: {
        name: "remove_first",
        description:
          "Removes the first instance of a substring inside a string",
        category: "String",
        returnType: "string",
        syntax: "string | remove_first: substring",
        parameters: {
          substring: { type: "string", description: "Substring to remove" },
        },
      },

      remove_last: {
        name: "remove_last",
        description: "Removes the last instance of a substring inside a string",
        category: "String",
        returnType: "string",
        syntax: "string | remove_last: substring",
        parameters: {
          substring: { type: "string", description: "Substring to remove" },
        },
      },

      replace: {
        name: "replace",
        description:
          "Replaces any instance of a substring inside a string with a given string",
        category: "String",
        returnType: "string",
        syntax: "string | replace: search, replacement",
        parameters: {
          search: { type: "string", description: "String to search for" },
          replacement: { type: "string", description: "Replacement string" },
        },
      },

      replace_first: {
        name: "replace_first",
        description:
          "Replaces the first instance of a substring inside a string with a given string",
        category: "String",
        returnType: "string",
        syntax: "string | replace_first: search, replacement",
        parameters: {
          search: { type: "string", description: "String to search for" },
          replacement: { type: "string", description: "Replacement string" },
        },
      },

      replace_last: {
        name: "replace_last",
        description:
          "Replaces the last instance of a substring inside a string with a given string",
        category: "String",
        returnType: "string",
        syntax: "string | replace_last: search, replacement",
        parameters: {
          search: { type: "string", description: "String to search for" },
          replacement: { type: "string", description: "Replacement string" },
        },
      },

      rstrip: {
        name: "rstrip",
        description: "Strips all whitespace from the right of a string",
        category: "String",
        returnType: "string",
        syntax: "string | rstrip",
      },

      sha1: {
        name: "sha1",
        description: "Converts a string into an SHA-1 hash",
        category: "String",
        returnType: "string",
        syntax: "string | sha1",
      },

      sha256: {
        name: "sha256",
        description: "Converts a string into an SHA-256 hash",
        category: "String",
        returnType: "string",
        syntax: "string | sha256",
      },

      slice: {
        name: "slice",
        description:
          "Returns a substring or series of array items, starting at a given 0-based index",
        category: "String",
        returnType: "string",
        syntax: "string | slice: start, length",
        parameters: {
          start: { type: "number", description: "Starting index (0-based)" },
          length: {
            type: "number",
            description: "Number of characters (default: 1)",
          },
        },
      },

      split: {
        name: "split",
        description:
          "Splits a string into an array of substrings based on a given separator",
        category: "String",
        returnType: "array<string>",
        syntax: "string | split: separator",
        parameters: {
          separator: { type: "string", description: "String separator" },
        },
      },

      strip: {
        name: "strip",
        description:
          "Strips all whitespace from the left and right of a string",
        category: "String",
        returnType: "string",
        syntax: "string | strip",
      },

      strip_html: {
        name: "strip_html",
        description: "Strips all HTML tags from a string",
        category: "String",
        returnType: "string",
        syntax: "string | strip_html",
      },

      strip_newlines: {
        name: "strip_newlines",
        description:
          "Strips all newline characters (line breaks) from a string",
        category: "String",
        returnType: "string",
        syntax: "string | strip_newlines",
      },

      truncate: {
        name: "truncate",
        description: "Truncates a string down to a given number of characters",
        category: "String",
        returnType: "string",
        syntax: "string | truncate: length, ellipsis",
        parameters: {
          length: {
            type: "number",
            description: "Maximum number of characters",
          },
          ellipsis: {
            type: "string",
            description: "Custom ellipsis",
            default: "...",
          },
        },
      },

      truncatewords: {
        name: "truncatewords",
        description: "Truncates a string down to a given number of words",
        category: "String",
        returnType: "string",
        syntax: "string | truncatewords: words, ellipsis",
        parameters: {
          words: { type: "number", description: "Maximum number of words" },
          ellipsis: {
            type: "string",
            description: "Custom ellipsis",
            default: "...",
          },
        },
      },

      upcase: {
        name: "upcase",
        description: "Converts a string to all uppercase characters",
        category: "String",
        returnType: "string",
        syntax: "string | upcase",
      },

      url_decode: {
        name: "url_decode",
        description: "Decodes any percent-encoded characters in a string",
        category: "String",
        returnType: "string",
        syntax: "string | url_decode",
      },

      url_encode: {
        name: "url_encode",
        description:
          "Converts any URL-unsafe characters in a string to the percent-encoded equivalent",
        category: "String",
        returnType: "string",
        syntax: "string | url_encode",
      },

      url_escape: {
        name: "url_escape",
        description: "Escapes any URL-unsafe characters in a string",
        category: "String",
        returnType: "string",
        syntax: "string | url_escape",
      },

      url_param_escape: {
        name: "url_param_escape",
        description:
          "Escapes any characters in a string that are unsafe for URL parameters",
        category: "String",
        returnType: "string",
        syntax: "string | url_param_escape",
      },

      // Tag Filters
      link_to_add_tag: {
        name: "link_to_add_tag",
        description:
          "Generates an HTML <a> tag linking to the current blog or collection, filtered to show only articles or products that have a given tag",
        category: "Tag",
        returnType: "string",
        syntax: "string | link_to_add_tag: tag",
        parameters: {
          tag: { type: "string", description: "Tag to add" },
        },
      },

      link_to_remove_tag: {
        name: "link_to_remove_tag",
        description:
          "Generates an HTML <a> tag linking to the current blog or collection, filtered to show articles or products that have any currently active tags, except the provided tag",
        category: "Tag",
        returnType: "string",
        syntax: "string | link_to_remove_tag: tag",
        parameters: {
          tag: { type: "string", description: "Tag to remove" },
        },
      },

      link_to_tag: {
        name: "link_to_tag",
        description:
          "Generates an HTML <a> tag linking to the current blog or collection, filtered to show only articles or products that have a given tag",
        category: "Tag",
        returnType: "string",
        syntax: "string | link_to_tag: tag",
        parameters: {
          tag: { type: "string", description: "Tag to link to" },
        },
      },
    };
  }
}
