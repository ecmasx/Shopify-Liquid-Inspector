export interface ShopifyObjectDefinition {
  type: string;
  description: string;
  properties: { [key: string]: any };
}

export class ShopifyObjectRegistry {
  private objects: { [key: string]: ShopifyObjectDefinition } = {};

  constructor() {
    this.initializeObjects();
  }

  getObject(name: string): ShopifyObjectDefinition | null {
    return this.objects[name] || null;
  }

  getAllObjects(): { [key: string]: ShopifyObjectDefinition } {
    return this.objects;
  }

  private initializeObjects() {
    this.objects = {
      shop: {
        type: "Shop",
        description: "Represents the shop",
        properties: {
          id: { type: "number", description: "Shop ID" },
          name: { type: "string", description: "Shop name" },
          email: { type: "string", description: "Shop email" },
          domain: { type: "string", description: "Shop domain" },
          url: { type: "string", description: "Shop URL" },
          currency: { type: "string", description: "Shop currency" },
          money_format: { type: "string", description: "Money format" },
          money_with_currency_format: {
            type: "string",
            description: "Money with currency format",
          },
          description: { type: "string", description: "Shop description" },
          created_at: { type: "date", description: "Shop creation date" },
          updated_at: { type: "date", description: "Shop last update" },
          address: { type: "address", description: "Shop address" },
          phone: { type: "string", description: "Shop phone" },
          customer_email: {
            type: "string",
            description: "Customer service email",
          },
          timezone: { type: "string", description: "Shop timezone" },
          primary_locale: { type: "string", description: "Primary locale" },
          enabled_currencies: {
            type: "array<string>",
            description: "Enabled currencies",
          },
        },
      },

      product: {
        type: "Product",
        description: "Represents a product in your Shopify store",
        properties: {
          id: {
            type: "number",
            description: "The unique identifier for the product",
          },
          title: { type: "string", description: "The title of the product" },
          handle: { type: "string", description: "The handle of the product" },
          description: {
            type: "string",
            description: "The description of the product",
          },
          content: {
            type: "string",
            description: "The content of the product",
          },
          excerpt: {
            type: "string",
            description: "The excerpt of the product",
          },
          price: { type: "money", description: "The price of the product" },
          price_min: { type: "money", description: "The lowest variant price" },
          price_max: {
            type: "money",
            description: "The highest variant price",
          },
          available: {
            type: "boolean",
            description: "Whether the product is available for purchase",
          },
          compare_at_price: {
            type: "money",
            description: "The compare at price of the product",
          },
          compare_at_price_min: {
            type: "money",
            description: "The lowest variant compare at price",
          },
          compare_at_price_max: {
            type: "money",
            description: "The highest variant compare at price",
          },
          variants: {
            type: "array<variant>",
            description: "Array of product variants",
          },
          images: {
            type: "array<image>",
            description: "Array of product images",
          },
          featured_image: {
            type: "image",
            description: "The featured image of the product",
          },
          options: {
            type: "array<option>",
            description: "Array of product options",
          },
          tags: { type: "array<string>", description: "Array of product tags" },
          type: { type: "string", description: "The product type" },
          vendor: { type: "string", description: "The vendor of the product" },
          created_at: {
            type: "date",
            description: "The date the product was created",
          },
          published_at: {
            type: "date",
            description: "The date the product was published",
          },
          updated_at: {
            type: "date",
            description: "The date the product was updated",
          },
          url: {
            type: "string",
            description: "The relative URL of the product",
          },
          first_available_variant: {
            type: "variant",
            description: "The first available variant",
          },
          selected_variant: {
            type: "variant",
            description: "The currently selected variant",
          },
          selected_or_first_available_variant: {
            type: "variant",
            description: "Selected or first available variant",
          },
          has_only_default_variant: {
            type: "boolean",
            description: "Whether product has only default variant",
          },
          metafields: {
            type: "array<metafield>",
            description: "Product metafields",
          },
        },
      },

      variant: {
        type: "Variant",
        description: "Represents a product variant",
        properties: {
          id: { type: "number", description: "Variant ID" },
          title: { type: "string", description: "Variant title" },
          price: { type: "money", description: "Variant price" },
          compare_at_price: { type: "money", description: "Compare at price" },
          available: {
            type: "boolean",
            description: "Whether variant is available",
          },
          inventory_quantity: {
            type: "number",
            description: "Inventory quantity",
          },
          inventory_management: {
            type: "string",
            description: "Inventory management",
          },
          inventory_policy: { type: "string", description: "Inventory policy" },
          weight: { type: "number", description: "Variant weight" },
          weight_unit: { type: "string", description: "Weight unit" },
          option1: { type: "string", description: "First option value" },
          option2: { type: "string", description: "Second option value" },
          option3: { type: "string", description: "Third option value" },
          sku: { type: "string", description: "SKU" },
          barcode: { type: "string", description: "Barcode" },
          image: { type: "image", description: "Variant image" },
          featured_image: {
            type: "image",
            description: "Variant featured image",
          },
          url: { type: "string", description: "Variant URL" },
          requires_shipping: {
            type: "boolean",
            description: "Whether variant requires shipping",
          },
          taxable: {
            type: "boolean",
            description: "Whether variant is taxable",
          },
          tax_code: { type: "string", description: "Tax code" },
          unit_price: { type: "money", description: "Unit price" },
          unit_price_measurement: {
            type: "object",
            description: "Unit price measurement",
          },
          metafields: {
            type: "array<metafield>",
            description: "Variant metafields",
          },
        },
      },

      cart: {
        type: "Cart",
        description: "Represents the customer's cart",
        properties: {
          id: { type: "string", description: "The cart ID" },
          item_count: {
            type: "number",
            description: "Number of items in cart",
          },
          item_count_is_singular: {
            type: "boolean",
            description: "Whether cart has exactly one item",
          },
          items: { type: "array<item>", description: "Array of cart items" },
          total_price: { type: "money", description: "Total price of cart" },
          total_weight: { type: "number", description: "Total weight of cart" },
          currency: { type: "string", description: "Cart currency" },
          attributes: { type: "object", description: "Cart attributes" },
          note: { type: "string", description: "Cart note" },
          empty: { type: "boolean", description: "Whether cart is empty" },
          requires_shipping: {
            type: "boolean",
            description: "Whether cart requires shipping",
          },
          taxes_included: {
            type: "boolean",
            description: "Whether taxes are included",
          },
          total_discount: {
            type: "money",
            description: "Total discount amount",
          },
        },
      },

      customer: {
        type: "Customer",
        description: "Represents a customer",
        properties: {
          id: { type: "number", description: "Customer ID" },
          email: { type: "string", description: "Customer email" },
          first_name: { type: "string", description: "Customer first name" },
          last_name: { type: "string", description: "Customer last name" },
          name: { type: "string", description: "Customer full name" },
          phone: { type: "string", description: "Customer phone" },
          accepts_marketing: {
            type: "boolean",
            description: "Whether customer accepts marketing",
          },
          addresses: {
            type: "array<address>",
            description: "Customer addresses",
          },
          default_address: {
            type: "address",
            description: "Default customer address",
          },
          orders: { type: "array<order>", description: "Customer orders" },
          orders_count: {
            type: "number",
            description: "Number of customer orders",
          },
          total_spent: {
            type: "money",
            description: "Total amount spent by customer",
          },
          tags: { type: "array<string>", description: "Customer tags" },
          has_account: {
            type: "boolean",
            description: "Whether customer has an account",
          },
          created_at: { type: "date", description: "Customer creation date" },
          updated_at: { type: "date", description: "Customer last update" },
          last_order: { type: "order", description: "Customer's last order" },
          metafields: {
            type: "array<metafield>",
            description: "Customer metafields",
          },
        },
      },

      collection: {
        type: "Collection",
        description: "Represents a collection of products",
        properties: {
          id: { type: "number", description: "Collection ID" },
          title: { type: "string", description: "Collection title" },
          handle: { type: "string", description: "Collection handle" },
          description: {
            type: "string",
            description: "Collection description",
          },
          products: {
            type: "array<product>",
            description: "Products in collection",
          },
          products_count: {
            type: "number",
            description: "Number of products in collection",
          },
          url: { type: "string", description: "Collection URL" },
          image: { type: "image", description: "Collection image" },
          featured_image: { type: "image", description: "Featured image" },
          all_products_count: {
            type: "number",
            description: "Total products in collection",
          },
          all_tags: {
            type: "array<string>",
            description: "All tags in collection",
          },
          all_types: {
            type: "array<string>",
            description: "All product types in collection",
          },
          all_vendors: {
            type: "array<string>",
            description: "All vendors in collection",
          },
          sort_by: { type: "string", description: "Sort order" },
          default_sort_by: {
            type: "string",
            description: "Default sort order",
          },
          template_suffix: { type: "string", description: "Template suffix" },
          published_at: { type: "date", description: "Publication date" },
          created_at: { type: "date", description: "Creation date" },
          updated_at: { type: "date", description: "Last update date" },
          metafields: {
            type: "array<metafield>",
            description: "Collection metafields",
          },
        },
      },

      image: {
        type: "Image",
        description: "Represents an image",
        properties: {
          id: { type: "number", description: "Image ID" },
          alt: { type: "string", description: "Alt text" },
          src: { type: "string", description: "Image URL" },
          url: { type: "string", description: "Image URL" },
          width: { type: "number", description: "Image width" },
          height: { type: "number", description: "Image height" },
          aspect_ratio: { type: "number", description: "Image aspect ratio" },
          created_at: { type: "date", description: "Creation date" },
          updated_at: { type: "date", description: "Update date" },
          position: { type: "number", description: "Image position" },
          product_id: { type: "number", description: "Associated product ID" },
          variant_ids: {
            type: "array<number>",
            description: "Associated variant IDs",
          },
        },
      },

      address: {
        type: "Address",
        description: "Represents an address",
        properties: {
          id: { type: "number", description: "Address ID" },
          first_name: { type: "string", description: "First name" },
          last_name: { type: "string", description: "Last name" },
          name: { type: "string", description: "Full name" },
          company: { type: "string", description: "Company" },
          address1: { type: "string", description: "Address line 1" },
          address2: { type: "string", description: "Address line 2" },
          street: { type: "string", description: "Street address" },
          city: { type: "string", description: "City" },
          province: { type: "string", description: "Province/State" },
          province_code: { type: "string", description: "Province/State code" },
          country: { type: "string", description: "Country" },
          country_code: { type: "string", description: "Country code" },
          zip: { type: "string", description: "ZIP/Postal code" },
          phone: { type: "string", description: "Phone number" },
          default: {
            type: "boolean",
            description: "Whether this is the default address",
          },
        },
      },

      order: {
        type: "Order",
        description: "Represents an order",
        properties: {
          id: { type: "number", description: "Order ID" },
          name: { type: "string", description: "Order name" },
          order_number: { type: "number", description: "Order number" },
          order_status_url: { type: "string", description: "Order status URL" },
          email: { type: "string", description: "Customer email" },
          phone: { type: "string", description: "Customer phone" },
          created_at: { type: "date", description: "Order creation date" },
          updated_at: { type: "date", description: "Order update date" },
          cancelled_at: {
            type: "date",
            description: "Order cancellation date",
          },
          cancel_reason: { type: "string", description: "Cancellation reason" },
          total_price: { type: "money", description: "Total order price" },
          subtotal_price: { type: "money", description: "Subtotal price" },
          total_discounts: { type: "money", description: "Total discounts" },
          total_tax: { type: "money", description: "Total tax" },
          tax_lines: { type: "array<tax_line>", description: "Tax lines" },
          line_items: {
            type: "array<line_item>",
            description: "Order line items",
          },
          line_items_subtotal_price: {
            type: "money",
            description: "Line items subtotal",
          },
          customer: { type: "customer", description: "Order customer" },
          billing_address: { type: "address", description: "Billing address" },
          shipping_address: {
            type: "address",
            description: "Shipping address",
          },
          fulfillments: {
            type: "array<fulfillment>",
            description: "Order fulfillments",
          },
          shipping_methods: {
            type: "array<shipping_method>",
            description: "Shipping methods",
          },
          financial_status: { type: "string", description: "Financial status" },
          fulfillment_status: {
            type: "string",
            description: "Fulfillment status",
          },
          currency: { type: "string", description: "Order currency" },
          tags: { type: "array<string>", description: "Order tags" },
          note: { type: "string", description: "Order note" },
          attributes: { type: "object", description: "Order attributes" },
          discount_applications: {
            type: "array<discount>",
            description: "Applied discounts",
          },
          transactions: {
            type: "array<transaction>",
            description: "Order transactions",
          },
        },
      },

      item: {
        type: "Item",
        description: "Represents a cart item",
        properties: {
          id: { type: "number", description: "Line item ID" },
          key: { type: "string", description: "Line item key" },
          variant_id: { type: "number", description: "Variant ID" },
          product_id: { type: "number", description: "Product ID" },
          title: { type: "string", description: "Item title" },
          price: { type: "money", description: "Item price" },
          line_price: { type: "money", description: "Line price" },
          final_price: {
            type: "money",
            description: "Final price after discounts",
          },
          final_line_price: {
            type: "money",
            description: "Final line price after discounts",
          },
          quantity: { type: "number", description: "Item quantity" },
          sku: { type: "string", description: "SKU" },
          grams: { type: "number", description: "Weight in grams" },
          vendor: { type: "string", description: "Vendor" },
          product_title: { type: "string", description: "Product title" },
          variant_title: { type: "string", description: "Variant title" },
          url: { type: "string", description: "Item URL" },
          image: { type: "image", description: "Item image" },
          handle: { type: "string", description: "Product handle" },
          requires_shipping: {
            type: "boolean",
            description: "Whether item requires shipping",
          },
          product_type: { type: "string", description: "Product type" },
          properties: { type: "object", description: "Line item properties" },
          gift_card: {
            type: "boolean",
            description: "Whether item is a gift card",
          },
          discounts: {
            type: "array<discount>",
            description: "Applied discounts",
          },
          unit_price: { type: "money", description: "Unit price" },
          unit_price_measurement: {
            type: "object",
            description: "Unit price measurement",
          },
        },
      },

      line_item: {
        type: "LineItem",
        description: "Represents an order line item",
        properties: {
          id: { type: "number", description: "Line item ID" },
          variant_id: { type: "number", description: "Variant ID" },
          product_id: { type: "number", description: "Product ID" },
          title: { type: "string", description: "Line item title" },
          price: { type: "money", description: "Line item price" },
          line_price: { type: "money", description: "Total line price" },
          final_price: {
            type: "money",
            description: "Final price after discounts",
          },
          final_line_price: {
            type: "money",
            description: "Final line price after discounts",
          },
          quantity: { type: "number", description: "Quantity" },
          sku: { type: "string", description: "SKU" },
          grams: { type: "number", description: "Weight in grams" },
          vendor: { type: "string", description: "Vendor" },
          product_title: { type: "string", description: "Product title" },
          variant_title: { type: "string", description: "Variant title" },
          fulfillment_service: {
            type: "string",
            description: "Fulfillment service",
          },
          requires_shipping: {
            type: "boolean",
            description: "Whether line item requires shipping",
          },
          taxable: {
            type: "boolean",
            description: "Whether line item is taxable",
          },
          gift_card: {
            type: "boolean",
            description: "Whether line item is a gift card",
          },
          variant: { type: "variant", description: "Associated variant" },
          product: { type: "product", description: "Associated product" },
          image: { type: "image", description: "Line item image" },
          url: { type: "string", description: "Product URL" },
          properties: { type: "object", description: "Line item properties" },
          successfully_fulfilled_quantity: {
            type: "number",
            description: "Successfully fulfilled quantity",
          },
          fulfillment_quantity: {
            type: "number",
            description: "Fulfillment quantity",
          },
          unit_price: { type: "money", description: "Unit price" },
          unit_price_measurement: {
            type: "object",
            description: "Unit price measurement",
          },
          tax_lines: { type: "array<tax_line>", description: "Tax lines" },
          discount_allocations: {
            type: "array<discount>",
            description: "Discount allocations",
          },
        },
      },

      option: {
        type: "Option",
        description: "Represents a product option",
        properties: {
          name: { type: "string", description: "Option name" },
          position: { type: "number", description: "Option position" },
          values: { type: "array<string>", description: "Option values" },
          selected_value: {
            type: "string",
            description: "Currently selected value",
          },
        },
      },

      page: {
        type: "Page",
        description: "Represents a page",
        properties: {
          id: { type: "number", description: "Page ID" },
          title: { type: "string", description: "Page title" },
          content: { type: "string", description: "Page content" },
          summary: { type: "string", description: "Page summary" },
          excerpt: { type: "string", description: "Page excerpt" },
          handle: { type: "string", description: "Page handle" },
          url: { type: "string", description: "Page URL" },
          created_at: { type: "date", description: "Creation date" },
          updated_at: { type: "date", description: "Update date" },
          published_at: { type: "date", description: "Publication date" },
          template_suffix: { type: "string", description: "Template suffix" },
          metafields: {
            type: "array<metafield>",
            description: "Page metafields",
          },
        },
      },

      blog: {
        type: "Blog",
        description: "Represents a blog",
        properties: {
          id: { type: "number", description: "Blog ID" },
          title: { type: "string", description: "Blog title" },
          handle: { type: "string", description: "Blog handle" },
          url: { type: "string", description: "Blog URL" },
          articles: { type: "array<article>", description: "Blog articles" },
          moderated: {
            type: "boolean",
            description: "Whether comments are moderated",
          },
          commentable: { type: "string", description: "Comment settings" },
          feedburner: { type: "string", description: "Feedburner URL" },
          feedburner_location: {
            type: "string",
            description: "Feedburner location",
          },
          created_at: { type: "date", description: "Creation date" },
          updated_at: { type: "date", description: "Update date" },
          tags: { type: "array<string>", description: "All tags in blog" },
          summary: { type: "string", description: "Blog summary" },
          template_suffix: { type: "string", description: "Template suffix" },
          metafields: {
            type: "array<metafield>",
            description: "Blog metafields",
          },
        },
      },

      article: {
        type: "Article",
        description: "Represents a blog article",
        properties: {
          id: { type: "number", description: "Article ID" },
          title: { type: "string", description: "Article title" },
          content: { type: "string", description: "Article content" },
          excerpt: { type: "string", description: "Article excerpt" },
          summary: { type: "string", description: "Article summary" },
          handle: { type: "string", description: "Article handle" },
          url: { type: "string", description: "Article URL" },
          created_at: { type: "date", description: "Creation date" },
          updated_at: { type: "date", description: "Update date" },
          published_at: { type: "date", description: "Publication date" },
          author: { type: "string", description: "Author" },
          user: { type: "user", description: "User who created the article" },
          tags: { type: "array<string>", description: "Article tags" },
          image: { type: "image", description: "Article image" },
          comment_post_url: { type: "string", description: "Comment post URL" },
          comments: { type: "array<comment>", description: "Article comments" },
          comments_count: { type: "number", description: "Number of comments" },
          comments_enabled: {
            type: "boolean",
            description: "Whether comments are enabled",
          },
          moderated: {
            type: "boolean",
            description: "Whether comments are moderated",
          },
          template_suffix: { type: "string", description: "Template suffix" },
          metafields: {
            type: "array<metafield>",
            description: "Article metafields",
          },
        },
      },

      search: {
        type: "Search",
        description: "Search results",
        properties: {
          performed: {
            type: "boolean",
            description: "Whether search was performed",
          },
          results: { type: "array<product>", description: "Search results" },
          results_count: { type: "number", description: "Number of results" },
          terms: { type: "string", description: "Search terms" },
          types: { type: "array<string>", description: "Result types" },
          url: { type: "string", description: "Search URL" },
        },
      },

      request: {
        type: "Request",
        description: "Current request information",
        properties: {
          host: { type: "string", description: "Request host" },
          origin: { type: "string", description: "Request origin" },
          path: { type: "string", description: "Request path" },
          page_type: { type: "string", description: "Page type" },
          locale: { type: "object", description: "Current locale" },
          design_mode: {
            type: "boolean",
            description: "Whether in design mode",
          },
        },
      },

      settings: {
        type: "Settings",
        description: "Theme settings",
        properties: {},
      },

      routes: {
        type: "Routes",
        description: "Store routes",
        properties: {
          root_url: { type: "string", description: "Root URL" },
          account_addresses_url: {
            type: "string",
            description: "Account addresses URL",
          },
          account_login_url: {
            type: "string",
            description: "Account login URL",
          },
          account_logout_url: {
            type: "string",
            description: "Account logout URL",
          },
          account_recover_url: {
            type: "string",
            description: "Account recovery URL",
          },
          account_register_url: {
            type: "string",
            description: "Account registration URL",
          },
          account_url: { type: "string", description: "Account URL" },
          cart_add_url: { type: "string", description: "Cart add URL" },
          cart_change_url: { type: "string", description: "Cart change URL" },
          cart_clear_url: { type: "string", description: "Cart clear URL" },
          cart_update_url: { type: "string", description: "Cart update URL" },
          cart_url: { type: "string", description: "Cart URL" },
          collections_url: { type: "string", description: "Collections URL" },
          search_url: { type: "string", description: "Search URL" },
        },
      },

      metafield: {
        type: "Metafield",
        description: "Represents a metafield",
        properties: {
          id: { type: "number", description: "Metafield ID" },
          namespace: { type: "string", description: "Metafield namespace" },
          key: { type: "string", description: "Metafield key" },
          value: { type: "string", description: "Metafield value" },
          type: { type: "string", description: "Metafield type" },
          description: { type: "string", description: "Metafield description" },
          created_at: { type: "date", description: "Creation date" },
          updated_at: { type: "date", description: "Update date" },
        },
      },

      localization: {
        type: "Localization",
        description: "Localization information",
        properties: {
          language: { type: "language", description: "Current language" },
          country: { type: "country", description: "Current country" },
          market: { type: "market", description: "Current market" },
          available_languages: {
            type: "array<language>",
            description: "Available languages",
          },
          available_countries: {
            type: "array<country>",
            description: "Available countries",
          },
        },
      },

      language: {
        type: "Language",
        description: "Represents a language",
        properties: {
          iso_code: { type: "string", description: "ISO language code" },
          name: { type: "string", description: "Language name" },
          root_url: {
            type: "string",
            description: "Root URL for this language",
          },
        },
      },

      country: {
        type: "Country",
        description: "Represents a country",
        properties: {
          iso_code: { type: "string", description: "ISO country code" },
          name: { type: "string", description: "Country name" },
          currency: { type: "currency", description: "Country currency" },
          unit_system: { type: "string", description: "Unit system" },
        },
      },

      currency: {
        type: "Currency",
        description: "Represents a currency",
        properties: {
          iso_code: { type: "string", description: "ISO currency code" },
          name: { type: "string", description: "Currency name" },
          symbol: { type: "string", description: "Currency symbol" },
        },
      },

      form: {
        type: "Form",
        description: "Represents a form",
        properties: {
          errors: { type: "object", description: "Form errors" },
          author: { type: "string", description: "Form author" },
          body: { type: "string", description: "Form body" },
          email: { type: "string", description: "Form email" },
          id: { type: "string", description: "Form ID" },
          posted_successfully: {
            type: "boolean",
            description: "Whether form was posted successfully",
          },
        },
      },

      forloop: {
        type: "ForLoop",
        description: "For loop object",
        properties: {
          first: { type: "boolean", description: "Whether first iteration" },
          index: { type: "number", description: "Current index" },
          index0: { type: "number", description: "Current index (0-indexed)" },
          last: { type: "boolean", description: "Whether last iteration" },
          length: { type: "number", description: "Total number of iterations" },
          rindex: { type: "number", description: "Reverse index" },
          rindex0: { type: "number", description: "Reverse index (0-indexed)" },
        },
      },

      tablerow: {
        type: "TableRow",
        description: "Table row in forloop",
        properties: {
          col: { type: "number", description: "Current column" },
          col0: { type: "number", description: "Current column (0-indexed)" },
          col_first: { type: "boolean", description: "Whether first column" },
          col_last: { type: "boolean", description: "Whether last column" },
          first: { type: "boolean", description: "Whether first row" },
          index: { type: "number", description: "Current index" },
          index0: { type: "number", description: "Current index (0-indexed)" },
          last: { type: "boolean", description: "Whether last row" },
          length: { type: "number", description: "Total number of rows" },
          rindex: { type: "number", description: "Reverse index" },
          rindex0: { type: "number", description: "Reverse index (0-indexed)" },
        },
      },

      discount: {
        type: "Discount",
        description: "Represents a discount",
        properties: {
          id: { type: "string", description: "Discount ID" },
          code: { type: "string", description: "Discount code" },
          type: { type: "string", description: "Discount type" },
          amount: { type: "money", description: "Discount amount" },
          title: { type: "string", description: "Discount title" },
          savings: { type: "money", description: "Discount savings" },
        },
      },

      gift_card: {
        type: "GiftCard",
        description: "Represents a gift card",
        properties: {
          id: { type: "number", description: "Gift card ID" },
          balance: { type: "money", description: "Gift card balance" },
          amount_used: { type: "money", description: "Amount used" },
          last_characters: {
            type: "string",
            description: "Last characters of code",
          },
          code: { type: "string", description: "Gift card code" },
          expired: {
            type: "boolean",
            description: "Whether gift card is expired",
          },
          enabled: {
            type: "boolean",
            description: "Whether gift card is enabled",
          },
        },
      },

      fulfillment: {
        type: "Fulfillment",
        description: "Represents a fulfillment",
        properties: {
          id: { type: "number", description: "Fulfillment ID" },
          status: { type: "string", description: "Fulfillment status" },
          created_at: { type: "date", description: "Creation date" },
          updated_at: { type: "date", description: "Update date" },
          tracking_company: { type: "string", description: "Tracking company" },
          tracking_number: { type: "string", description: "Tracking number" },
          tracking_url: { type: "string", description: "Tracking URL" },
          tracking_numbers: {
            type: "array<string>",
            description: "Tracking numbers",
          },
          tracking_urls: {
            type: "array<string>",
            description: "Tracking URLs",
          },
          item_count: { type: "number", description: "Number of items" },
        },
      },

      transaction: {
        type: "Transaction",
        description: "Represents a transaction",
        properties: {
          id: { type: "number", description: "Transaction ID" },
          amount: { type: "money", description: "Transaction amount" },
          kind: { type: "string", description: "Transaction kind" },
          gateway: { type: "string", description: "Payment gateway" },
          status: { type: "string", description: "Transaction status" },
          message: { type: "string", description: "Transaction message" },
          created_at: { type: "date", description: "Creation date" },
          receipt: { type: "object", description: "Transaction receipt" },
          currency_exchange: {
            type: "object",
            description: "Currency exchange info",
          },
        },
      },

      shipping_method: {
        type: "ShippingMethod",
        description: "Represents a shipping method",
        properties: {
          title: { type: "string", description: "Shipping method title" },
          price: { type: "money", description: "Shipping price" },
          handle: { type: "string", description: "Shipping method handle" },
          id: { type: "string", description: "Shipping method ID" },
        },
      },

      tax_line: {
        type: "TaxLine",
        description: "Represents a tax line",
        properties: {
          title: { type: "string", description: "Tax title" },
          price: { type: "money", description: "Tax amount" },
          rate: { type: "number", description: "Tax rate" },
          rate_percentage: {
            type: "number",
            description: "Tax rate percentage",
          },
        },
      },

      comment: {
        type: "Comment",
        description: "Represents a blog comment",
        properties: {
          id: { type: "number", description: "Comment ID" },
          author: { type: "string", description: "Comment author" },
          email: { type: "string", description: "Author email" },
          content: { type: "string", description: "Comment content" },
          status: { type: "string", description: "Comment status" },
          url: { type: "string", description: "Comment URL" },
          created_at: { type: "date", description: "Creation date" },
          updated_at: { type: "date", description: "Update date" },
          ip: { type: "string", description: "IP address" },
          user_agent: { type: "string", description: "User agent" },
        },
      },

      collections: {
        type: "Collections",
        description: "Array of all collections",
        properties: {
          size: { type: "number", description: "Number of collections" },
          all: { type: "array<collection>", description: "All collections" },
        },
      },

      pages: {
        type: "Pages",
        description: "Array of all pages",
        properties: {
          size: { type: "number", description: "Number of pages" },
          all: { type: "array<page>", description: "All pages" },
        },
      },

      blogs: {
        type: "Blogs",
        description: "Array of all blogs",
        properties: {
          size: { type: "number", description: "Number of blogs" },
          all: { type: "array<blog>", description: "All blogs" },
        },
      },

      all_products: {
        type: "AllProducts",
        description: "All products in the store",
        properties: {
          size: { type: "number", description: "Total number of products" },
        },
      },

      template: {
        type: "Template",
        description: "Current template information",
        properties: {
          name: { type: "string", description: "Template name" },
          suffix: { type: "string", description: "Template suffix" },
          directory: { type: "string", description: "Template directory" },
        },
      },

      video: {
        type: "Video",
        description: "Represents a video",
        properties: {
          id: { type: "number", description: "Video ID" },
          alt: { type: "string", description: "Alt text" },
          sources: { type: "array<object>", description: "Video sources" },
          preview_image: { type: "image", description: "Preview image" },
          aspect_ratio: { type: "number", description: "Video aspect ratio" },
          duration: { type: "number", description: "Video duration" },
        },
      },

      checkout: {
        type: "Checkout",
        description: "Represents a checkout",
        properties: {
          id: { type: "string", description: "Checkout ID" },
          currency: { type: "string", description: "Checkout currency" },
          customer: { type: "customer", description: "Customer" },
          billing_address: { type: "address", description: "Billing address" },
          shipping_address: {
            type: "address",
            description: "Shipping address",
          },
          line_items: { type: "array<line_item>", description: "Line items" },
          shipping_rate: {
            type: "shipping_rate",
            description: "Selected shipping rate",
          },
          shipping_method: {
            type: "shipping_method",
            description: "Shipping method",
          },
          tax_lines: { type: "array<tax_line>", description: "Tax lines" },
          tax_price: { type: "money", description: "Tax amount" },
          total_price: { type: "money", description: "Total price" },
          subtotal_price: { type: "money", description: "Subtotal price" },
          requires_shipping: {
            type: "boolean",
            description: "Whether checkout requires shipping",
          },
          gift_cards_enabled: {
            type: "boolean",
            description: "Whether gift cards are enabled",
          },
          taxes_included: {
            type: "boolean",
            description: "Whether taxes are included",
          },
          email: { type: "string", description: "Customer email" },
          applied_gift_cards: {
            type: "array<gift_card>",
            description: "Applied gift cards",
          },
          discount_applications: {
            type: "array<discount>",
            description: "Applied discounts",
          },
        },
      },

      filter: {
        type: "Filter",
        description: "Represents a collection filter",
        properties: {
          label: { type: "string", description: "Filter label" },
          param_name: { type: "string", description: "Filter parameter name" },
          type: { type: "string", description: "Filter type" },
          values: { type: "array<filter_value>", description: "Filter values" },
          active_values: {
            type: "array<filter_value>",
            description: "Active filter values",
          },
          inactive_values: {
            type: "array<filter_value>",
            description: "Inactive filter values",
          },
          min_value: {
            type: "object",
            description: "Minimum value for range filters",
          },
          max_value: {
            type: "object",
            description: "Maximum value for range filters",
          },
          range_max: { type: "object", description: "Maximum possible value" },
        },
      },

      paginate: {
        type: "Paginate",
        description: "Pagination object",
        properties: {
          current_page: { type: "number", description: "Current page number" },
          current_offset: { type: "number", description: "Current offset" },
          items: { type: "number", description: "Total number of items" },
          parts: { type: "array<object>", description: "Pagination parts" },
          pages: { type: "number", description: "Total number of pages" },
          previous: { type: "object", description: "Previous page info" },
          next: { type: "object", description: "Next page info" },
        },
      },

      section: {
        type: "Section",
        description: "Current section",
        properties: {
          id: { type: "string", description: "Section ID" },
          settings: { type: "object", description: "Section settings" },
          blocks: { type: "array<block>", description: "Section blocks" },
          location: { type: "string", description: "Section location" },
        },
      },

      block: {
        type: "Block",
        description: "Theme section block",
        properties: {
          id: { type: "string", description: "Block ID" },
          type: { type: "string", description: "Block type" },
          settings: { type: "object", description: "Block settings" },
          shopify_attributes: {
            type: "string",
            description: "Shopify attributes",
          },
        },
      },

      app: {
        type: "App",
        description: "Represents an app",
        properties: {
          id: { type: "number", description: "App ID" },
          name: { type: "string", description: "App name" },
          handle: { type: "string", description: "App handle" },
        },
      },

      recommendations: {
        type: "Recommendations",
        description: "Product recommendations",
        properties: {
          performed: {
            type: "boolean",
            description: "Whether recommendations were performed",
          },
          products: {
            type: "array<product>",
            description: "Recommended products",
          },
          products_count: {
            type: "number",
            description: "Number of recommended products",
          },
          intent: { type: "string", description: "Recommendation intent" },
        },
      },

      user: {
        type: "User",
        description: "Represents a user",
        properties: {
          id: { type: "number", description: "User ID" },
          account_owner: {
            type: "boolean",
            description: "Whether user is account owner",
          },
          bio: { type: "string", description: "User bio" },
          email: { type: "string", description: "User email" },
          first_name: { type: "string", description: "User first name" },
          homepage: { type: "string", description: "User homepage" },
          last_name: { type: "string", description: "User last name" },
          image: { type: "image", description: "User image" },
        },
      },

      market: {
        type: "Market",
        description: "Represents a market",
        properties: {
          id: { type: "string", description: "Market ID" },
          handle: { type: "string", description: "Market handle" },
        },
      },

      location: {
        type: "Location",
        description: "Represents a location",
        properties: {
          id: { type: "number", description: "Location ID" },
          name: { type: "string", description: "Location name" },
          address: { type: "address", description: "Location address" },
          latitude: { type: "number", description: "Location latitude" },
          longitude: { type: "number", description: "Location longitude" },
        },
      },

      policy: {
        type: "Policy",
        description: "Represents a shop policy",
        properties: {
          id: { type: "number", description: "Policy ID" },
          title: { type: "string", description: "Policy title" },
          body: { type: "string", description: "Policy content" },
          handle: { type: "string", description: "Policy handle" },
          url: { type: "string", description: "Policy URL" },
          created_at: { type: "date", description: "Creation date" },
          updated_at: { type: "date", description: "Update date" },
        },
      },

      script_tag: {
        type: "ScriptTag",
        description: "Represents a script tag",
        properties: {
          id: { type: "number", description: "Script tag ID" },
          src: { type: "string", description: "Script source URL" },
          event: { type: "string", description: "Script event" },
          display_scope: { type: "string", description: "Display scope" },
          created_at: { type: "date", description: "Creation date" },
          updated_at: { type: "date", description: "Update date" },
        },
      },

      theme: {
        type: "Theme",
        description: "Represents a theme",
        properties: {
          id: { type: "number", description: "Theme ID" },
          name: { type: "string", description: "Theme name" },
          role: { type: "string", description: "Theme role" },
          created_at: { type: "date", description: "Creation date" },
          updated_at: { type: "date", description: "Update date" },
        },
      },

      handle: {
        type: "Handle",
        description: "Current handle",
        properties: {
          current: { type: "string", description: "Current handle" },
        },
      },

      global: {
        type: "Global",
        description: "Global object",
        properties: {},
      },

      brand: {
        type: "Brand",
        description: "Represents brand information",
        properties: {
          name: { type: "string", description: "Brand name" },
          logo: { type: "image", description: "Brand logo" },
          square_logo: { type: "image", description: "Square brand logo" },
          cover_image: { type: "image", description: "Brand cover image" },
          metafields: {
            type: "array<metafield>",
            description: "Brand metafields",
          },
        },
      },

      font: {
        type: "Font",
        description: "Represents a font",
        properties: {
          family: { type: "string", description: "Font family" },
          fallback_families: {
            type: "string",
            description: "Fallback font families",
          },
          style: { type: "string", description: "Font style" },
          weight: { type: "string", description: "Font weight" },
          variants: { type: "array<object>", description: "Font variants" },
        },
      },

      link: {
        type: "Link",
        description: "Represents a navigation link",
        properties: {
          active: { type: "boolean", description: "Whether link is active" },
          child_active: {
            type: "boolean",
            description: "Whether child link is active",
          },
          current: { type: "boolean", description: "Whether link is current" },
          child_current: {
            type: "boolean",
            description: "Whether child link is current",
          },
          handle: { type: "string", description: "Link handle" },
          levels: { type: "number", description: "Number of levels" },
          links: { type: "array<link>", description: "Child links" },
          object: { type: "object", description: "Linked object" },
          title: { type: "string", description: "Link title" },
          type: { type: "string", description: "Link type" },
          url: { type: "string", description: "Link URL" },
        },
      },

      linklists: {
        type: "Linklists",
        description: "All navigation menus",
        properties: {
          main_menu: { type: "linklist", description: "Main menu" },
          footer: { type: "linklist", description: "Footer menu" },
        },
      },

      linklist: {
        type: "Linklist",
        description: "Represents a navigation menu",
        properties: {
          handle: { type: "string", description: "Linklist handle" },
          id: { type: "number", description: "Linklist ID" },
          links: { type: "array<link>", description: "Menu links" },
          title: { type: "string", description: "Linklist title" },
        },
      },

      metaobject: {
        type: "Metaobject",
        description: "Represents a metaobject",
        properties: {
          id: { type: "string", description: "Metaobject ID" },
          handle: { type: "string", description: "Metaobject handle" },
          type: { type: "string", description: "Metaobject type" },
          fields: { type: "object", description: "Metaobject fields" },
          system: { type: "object", description: "System fields" },
        },
      },

      shipping_rate: {
        type: "ShippingRate",
        description: "Represents a shipping rate",
        properties: {
          id: { type: "string", description: "Shipping rate ID" },
          price: { type: "money", description: "Shipping rate price" },
          title: { type: "string", description: "Shipping rate title" },
        },
      },

      predictive_search: {
        type: "PredictiveSearch",
        description: "Predictive search results",
        properties: {
          performed: {
            type: "boolean",
            description: "Whether search was performed",
          },
          resources: { type: "object", description: "Search resources" },
          terms: { type: "string", description: "Search terms" },
          types: { type: "array<string>", description: "Resource types" },
        },
      },

      apps: {
        type: "Apps",
        description: "Available apps",
        properties: {
          metafields: {
            type: "array<metafield>",
            description: "App metafields",
          },
        },
      },

      additional_checkout_buttons: {
        type: "AdditionalCheckoutButtons",
        description: "Additional checkout buttons",
        properties: {},
      },

      all_country_option_tags: {
        type: "AllCountryOptionTags",
        description: "All country option tags for forms",
        properties: {},
      },

      articles: {
        type: "Articles",
        description: "Array of all articles",
        properties: {
          size: { type: "number", description: "Number of articles" },
          all: { type: "array<article>", description: "All articles" },
        },
      },

      brand_color: {
        type: "BrandColor",
        description: "Represents a brand color",
        properties: {
          red: { type: "number", description: "Red component" },
          green: { type: "number", description: "Green component" },
          blue: { type: "number", description: "Blue component" },
          alpha: { type: "number", description: "Alpha component" },
          hue: { type: "number", description: "Hue component" },
          saturation: { type: "number", description: "Saturation component" },
          lightness: { type: "number", description: "Lightness component" },
        },
      },

      canonical_url: {
        type: "CanonicalUrl",
        description: "Canonical URL of the current page",
        properties: {},
      },

      closest: {
        type: "Closest",
        description: "Closest location or object",
        properties: {},
      },

      color: {
        type: "Color",
        description: "Represents a color",
        properties: {
          red: { type: "number", description: "Red component" },
          green: { type: "number", description: "Green component" },
          blue: { type: "number", description: "Blue component" },
          alpha: { type: "number", description: "Alpha component" },
          hue: { type: "number", description: "Hue component" },
          saturation: { type: "number", description: "Saturation component" },
          lightness: { type: "number", description: "Lightness component" },
          hex: { type: "string", description: "Hex color value" },
        },
      },

      color_scheme: {
        type: "ColorScheme",
        description: "Represents a color scheme",
        properties: {
          id: { type: "string", description: "Color scheme ID" },
          settings: { type: "object", description: "Color scheme settings" },
        },
      },

      color_scheme_group: {
        type: "ColorSchemeGroup",
        description: "Group of color schemes",
        properties: {
          schemes: {
            type: "array<color_scheme>",
            description: "Color schemes",
          },
        },
      },

      company: {
        type: "Company",
        description: "Represents a company",
        properties: {
          id: { type: "number", description: "Company ID" },
          name: { type: "string", description: "Company name" },
          locations: {
            type: "array<company_location>",
            description: "Company locations",
          },
          main_address: {
            type: "company_address",
            description: "Main company address",
          },
        },
      },

      company_address: {
        type: "CompanyAddress",
        description: "Represents a company address",
        properties: {
          id: { type: "number", description: "Address ID" },
          address1: { type: "string", description: "Address line 1" },
          address2: { type: "string", description: "Address line 2" },
          city: { type: "string", description: "City" },
          country: { type: "string", description: "Country" },
          country_code: { type: "string", description: "Country code" },
          province: { type: "string", description: "Province" },
          province_code: { type: "string", description: "Province code" },
          zip: { type: "string", description: "ZIP code" },
        },
      },

      company_location: {
        type: "CompanyLocation",
        description: "Represents a company location",
        properties: {
          id: { type: "number", description: "Location ID" },
          name: { type: "string", description: "Location name" },
          address: { type: "company_address", description: "Location address" },
          tax_registrations: {
            type: "array<object>",
            description: "Tax registrations",
          },
        },
      },

      content_for_additional_checkout_buttons: {
        type: "ContentForAdditionalCheckoutButtons",
        description: "Content for additional checkout buttons",
        properties: {},
      },

      content_for_header: {
        type: "ContentForHeader",
        description: "Content for header section",
        properties: {},
      },

      content_for_index: {
        type: "ContentForIndex",
        description: "Content for index page",
        properties: {},
      },

      content_for_layout: {
        type: "ContentForLayout",
        description: "Content for layout",
        properties: {},
      },

      country_option_tags: {
        type: "CountryOptionTags",
        description: "Country option tags for forms",
        properties: {},
      },

      current_page: {
        type: "CurrentPage",
        description: "Current page number in pagination",
        properties: {},
      },

      current_tags: {
        type: "CurrentTags",
        description: "Currently active tags",
        properties: {},
      },

      customer_payment_method: {
        type: "CustomerPaymentMethod",
        description: "Customer payment method",
        properties: {
          id: { type: "string", description: "Payment method ID" },
          type: { type: "string", description: "Payment method type" },
          instrument: { type: "object", description: "Payment instrument" },
        },
      },

      discount_allocation: {
        type: "DiscountAllocation",
        description: "Discount allocation to line item",
        properties: {
          amount: { type: "money", description: "Discount amount" },
          discount_application: {
            type: "discount_application",
            description: "Applied discount",
          },
        },
      },

      discount_application: {
        type: "DiscountApplication",
        description: "Applied discount",
        properties: {
          type: { type: "string", description: "Discount type" },
          title: { type: "string", description: "Discount title" },
          description: { type: "string", description: "Discount description" },
          value: { type: "string", description: "Discount value" },
          value_type: { type: "string", description: "Discount value type" },
          allocation_method: {
            type: "string",
            description: "Allocation method",
          },
          target_selection: { type: "string", description: "Target selection" },
          target_type: { type: "string", description: "Target type" },
          total_allocated_amount: {
            type: "money",
            description: "Total allocated amount",
          },
        },
      },

      external_video: {
        type: "ExternalVideo",
        description: "External video (YouTube/Vimeo)",
        properties: {
          id: { type: "string", description: "Video ID" },
          host: { type: "string", description: "Video host" },
          external_id: { type: "string", description: "External video ID" },
          aspect_ratio: { type: "number", description: "Video aspect ratio" },
        },
      },

      filter_value: {
        type: "FilterValue",
        description: "Filter value",
        properties: {
          label: { type: "string", description: "Filter value label" },
          count: { type: "number", description: "Number of products" },
          active: { type: "boolean", description: "Whether filter is active" },
          url_to_add: { type: "string", description: "URL to add filter" },
          url_to_remove: {
            type: "string",
            description: "URL to remove filter",
          },
          value: { type: "string", description: "Filter value" },
        },
      },

      filter_value_display: {
        type: "FilterValueDisplay",
        description: "Filter value display options",
        properties: {
          type: { type: "string", description: "Display type" },
          has_color: { type: "boolean", description: "Whether has color" },
        },
      },

      focal_point: {
        type: "FocalPoint",
        description: "Image focal point",
        properties: {
          x: { type: "number", description: "X coordinate" },
          y: { type: "number", description: "Y coordinate" },
        },
      },

      form_errors: {
        type: "FormErrors",
        description: "Form validation errors",
        properties: {},
      },

      generic_file: {
        type: "GenericFile",
        description: "Generic file upload",
        properties: {
          alt: { type: "string", description: "Alt text" },
          created_at: { type: "date", description: "Creation date" },
          id: { type: "string", description: "File ID" },
          preview_image: { type: "image", description: "Preview image" },
          url: { type: "string", description: "File URL" },
        },
      },

      group: {
        type: "Group",
        description: "Settings group",
        properties: {
          id: { type: "string", description: "Group ID" },
          label: { type: "string", description: "Group label" },
        },
      },

      images: {
        type: "Images",
        description: "Collection of images",
        properties: {
          size: { type: "number", description: "Number of images" },
          all: { type: "array<image>", description: "All images" },
        },
      },

      image_presentation: {
        type: "ImagePresentation",
        description: "Image presentation settings",
        properties: {
          focal_point: {
            type: "focal_point",
            description: "Image focal point",
          },
        },
      },

      measurement: {
        type: "Measurement",
        description: "Unit measurement",
        properties: {
          type: { type: "string", description: "Measurement type" },
          unit: { type: "string", description: "Measurement unit" },
          value: { type: "number", description: "Measurement value" },
        },
      },

      media: {
        type: "Media",
        description: "Media object (image, video, etc.)",
        properties: {
          id: { type: "string", description: "Media ID" },
          media_type: { type: "string", description: "Media type" },
          alt: { type: "string", description: "Alt text" },
          position: { type: "number", description: "Media position" },
          preview_image: { type: "image", description: "Preview image" },
        },
      },

      metaobject_definition: {
        type: "MetaobjectDefinition",
        description: "Metaobject definition",
        properties: {
          id: { type: "string", description: "Definition ID" },
          type: { type: "string", description: "Definition type" },
          name: { type: "string", description: "Definition name" },
          field_definitions: {
            type: "array<object>",
            description: "Field definitions",
          },
        },
      },

      metaobject_system: {
        type: "MetaobjectSystem",
        description: "Metaobject system fields",
        properties: {
          id: { type: "string", description: "System ID" },
          handle: { type: "string", description: "System handle" },
          type: { type: "string", description: "System type" },
        },
      },

      metaobjects: {
        type: "Metaobjects",
        description: "Collection of metaobjects",
        properties: {
          size: { type: "number", description: "Number of metaobjects" },
          all: { type: "array<metaobject>", description: "All metaobjects" },
        },
      },

      model: {
        type: "Model",
        description: "3D model",
        properties: {
          id: { type: "string", description: "Model ID" },
          alt: { type: "string", description: "Alt text" },
          sources: {
            type: "array<model_source>",
            description: "Model sources",
          },
          preview_image: { type: "image", description: "Preview image" },
        },
      },

      model_source: {
        type: "ModelSource",
        description: "3D model source",
        properties: {
          format: { type: "string", description: "Model format" },
          mime_type: { type: "string", description: "MIME type" },
          url: { type: "string", description: "Model URL" },
        },
      },

      money: {
        type: "Money",
        description: "Money amount with currency",
        properties: {
          amount: { type: "number", description: "Money amount" },
          currency_code: { type: "string", description: "Currency code" },
        },
      },

      page_description: {
        type: "PageDescription",
        description: "Current page description",
        properties: {},
      },

      page_image: {
        type: "PageImage",
        description: "Current page image",
        properties: {},
      },

      page_title: {
        type: "PageTitle",
        description: "Current page title",
        properties: {},
      },

      part: {
        type: "Part",
        description: "Pagination part",
        properties: {
          is_link: { type: "boolean", description: "Whether part is a link" },
          title: { type: "string", description: "Part title" },
          url: { type: "string", description: "Part URL" },
        },
      },

      pending_payment_instruction_input: {
        type: "PendingPaymentInstructionInput",
        description: "Pending payment instruction input",
        properties: {
          payment_method: { type: "string", description: "Payment method" },
          payment_amount: { type: "money", description: "Payment amount" },
        },
      },

      powered_by_link: {
        type: "PoweredByLink",
        description: "Powered by Shopify link",
        properties: {},
      },

      predictive_search_resources: {
        type: "PredictiveSearchResources",
        description: "Predictive search resources",
        properties: {
          queries: { type: "array<object>", description: "Search queries" },
          collections: {
            type: "array<collection>",
            description: "Collections",
          },
          pages: { type: "array<page>", description: "Pages" },
          articles: { type: "array<article>", description: "Articles" },
          products: { type: "array<product>", description: "Products" },
        },
      },

      product_option: {
        type: "ProductOption",
        description: "Product option (same as option)",
        properties: {
          name: { type: "string", description: "Option name" },
          position: { type: "number", description: "Option position" },
          values: { type: "array<string>", description: "Option values" },
          selected_value: {
            type: "string",
            description: "Currently selected value",
          },
        },
      },

      product_option_value: {
        type: "ProductOptionValue",
        description: "Product option value",
        properties: {
          option_name: { type: "string", description: "Option name" },
          name: { type: "string", description: "Value name" },
          swatch: { type: "swatch", description: "Color swatch" },
        },
      },

      quantity_price_break: {
        type: "QuantityPriceBreak",
        description: "Quantity price break for bulk pricing",
        properties: {
          minimum_quantity: { type: "number", description: "Minimum quantity" },
          price: { type: "money", description: "Price at this quantity" },
        },
      },

      quantity_rule: {
        type: "QuantityRule",
        description: "Quantity rule for products",
        properties: {
          min: { type: "number", description: "Minimum quantity" },
          max: { type: "number", description: "Maximum quantity" },
          increment: { type: "number", description: "Quantity increment" },
        },
      },

      rating: {
        type: "Rating",
        description: "Product rating",
        properties: {
          count: { type: "number", description: "Number of ratings" },
          value: { type: "number", description: "Rating value" },
        },
      },

      recipient: {
        type: "Recipient",
        description: "Gift card recipient",
        properties: {
          email: { type: "string", description: "Recipient email" },
          name: { type: "string", description: "Recipient name" },
        },
      },

      robots: {
        type: "Robots",
        description: "Robots meta tag content",
        properties: {},
      },

      rule: {
        type: "Rule",
        description: "Collection or discount rule",
        properties: {
          column: { type: "string", description: "Rule column" },
          relation: { type: "string", description: "Rule relation" },
          condition: { type: "string", description: "Rule condition" },
        },
      },

      script: {
        type: "Script",
        description: "JavaScript script",
        properties: {
          id: { type: "string", description: "Script ID" },
          display_scope: { type: "string", description: "Display scope" },
          src: { type: "string", description: "Script source" },
        },
      },

      scripts: {
        type: "Scripts",
        description: "Collection of scripts",
        properties: {
          checkout: { type: "array<script>", description: "Checkout scripts" },
          order_status: {
            type: "array<script>",
            description: "Order status scripts",
          },
        },
      },

      selling_plan: {
        type: "SellingPlan",
        description: "Subscription selling plan",
        properties: {
          id: { type: "string", description: "Selling plan ID" },
          name: { type: "string", description: "Selling plan name" },
          description: {
            type: "string",
            description: "Selling plan description",
          },
          options: {
            type: "array<selling_plan_option>",
            description: "Selling plan options",
          },
          price_adjustments: {
            type: "array<selling_plan_price_adjustment>",
            description: "Price adjustments",
          },
          checkout_charge: {
            type: "selling_plan_checkout_charge",
            description: "Checkout charge",
          },
        },
      },

      selling_plan_allocation: {
        type: "SellingPlanAllocation",
        description: "Selling plan allocation",
        properties: {
          selling_plan: {
            type: "selling_plan",
            description: "Associated selling plan",
          },
          price_adjustments: {
            type: "array<selling_plan_allocation_price_adjustment>",
            description: "Price adjustments",
          },
          price: { type: "money", description: "Allocation price" },
          compare_at_price: { type: "money", description: "Compare at price" },
        },
      },

      selling_plan_allocation_price_adjustment: {
        type: "SellingPlanAllocationPriceAdjustment",
        description: "Selling plan allocation price adjustment",
        properties: {
          position: { type: "number", description: "Adjustment position" },
          price: { type: "money", description: "Adjusted price" },
        },
      },

      selling_plan_checkout_charge: {
        type: "SellingPlanCheckoutCharge",
        description: "Selling plan checkout charge",
        properties: {
          type: { type: "string", description: "Charge type" },
          value: { type: "string", description: "Charge value" },
          value_type: { type: "string", description: "Value type" },
        },
      },

      selling_plan_group: {
        type: "SellingPlanGroup",
        description: "Group of selling plans",
        properties: {
          id: { type: "string", description: "Group ID" },
          name: { type: "string", description: "Group name" },
          options: {
            type: "array<selling_plan_group_option>",
            description: "Group options",
          },
          selling_plans: {
            type: "array<selling_plan>",
            description: "Selling plans",
          },
        },
      },

      selling_plan_group_option: {
        type: "SellingPlanGroupOption",
        description: "Selling plan group option",
        properties: {
          name: { type: "string", description: "Option name" },
          position: { type: "number", description: "Option position" },
          values: { type: "array<string>", description: "Option values" },
        },
      },

      selling_plan_option: {
        type: "SellingPlanOption",
        description: "Selling plan option",
        properties: {
          name: { type: "string", description: "Option name" },
          position: { type: "number", description: "Option position" },
          value: { type: "string", description: "Option value" },
        },
      },

      selling_plan_price_adjustment: {
        type: "SellingPlanPriceAdjustment",
        description: "Selling plan price adjustment",
        properties: {
          order_count: { type: "number", description: "Order count" },
          position: { type: "number", description: "Adjustment position" },
          value: { type: "string", description: "Adjustment value" },
          value_type: { type: "string", description: "Value type" },
        },
      },

      shop_locale: {
        type: "ShopLocale",
        description: "Shop locale information",
        properties: {
          name: { type: "string", description: "Locale name" },
          root_url: { type: "string", description: "Root URL" },
          endonym_name: { type: "string", description: "Endonym name" },
        },
      },

      sitemap: {
        type: "Sitemap",
        description: "Sitemap information",
        properties: {},
      },

      sort_option: {
        type: "SortOption",
        description: "Collection sort option",
        properties: {
          name: { type: "string", description: "Sort option name" },
          value: { type: "string", description: "Sort option value" },
        },
      },

      store_availability: {
        type: "StoreAvailability",
        description: "Store availability information",
        properties: {
          available: {
            type: "boolean",
            description: "Whether available in store",
          },
          location: { type: "location", description: "Store location" },
          pick_up_enabled: {
            type: "boolean",
            description: "Whether pickup is enabled",
          },
          pick_up_time: { type: "string", description: "Pickup time" },
        },
      },

      store_credit_account: {
        type: "StoreCreditAccount",
        description: "Store credit account",
        properties: {
          id: { type: "string", description: "Account ID" },
          balance: { type: "money", description: "Account balance" },
        },
      },

      swatch: {
        type: "Swatch",
        description: "Color swatch",
        properties: {
          color: { type: "color", description: "Swatch color" },
          image: { type: "image", description: "Swatch image" },
        },
      },

      tablerowloop: {
        type: "TableRowLoop",
        description: "Table row loop (same as tablerow)",
        properties: {
          col: { type: "number", description: "Current column" },
          col0: { type: "number", description: "Current column (0-indexed)" },
          col_first: { type: "boolean", description: "Whether first column" },
          col_last: { type: "boolean", description: "Whether last column" },
          first: { type: "boolean", description: "Whether first row" },
          index: { type: "number", description: "Current index" },
          index0: { type: "number", description: "Current index (0-indexed)" },
          last: { type: "boolean", description: "Whether last row" },
          length: { type: "number", description: "Total number of rows" },
          rindex: { type: "number", description: "Reverse index" },
          rindex0: { type: "number", description: "Reverse index (0-indexed)" },
        },
      },

      taxonomy_category: {
        type: "TaxonomyCategory",
        description: "Product taxonomy category",
        properties: {
          id: { type: "string", description: "Category ID" },
          name: { type: "string", description: "Category name" },
          full_name: { type: "string", description: "Full category name" },
        },
      },

      transaction_payment_details: {
        type: "TransactionPaymentDetails",
        description: "Transaction payment details",
        properties: {
          credit_card_bin: { type: "string", description: "Credit card BIN" },
          avs_result_code: { type: "string", description: "AVS result code" },
          cvv_result_code: { type: "string", description: "CVV result code" },
          credit_card_number: {
            type: "string",
            description: "Masked credit card number",
          },
          credit_card_company: {
            type: "string",
            description: "Credit card company",
          },
        },
      },

      unit_price_measurement: {
        type: "UnitPriceMeasurement",
        description: "Unit price measurement",
        properties: {
          measured_type: { type: "string", description: "Measured type" },
          quantity_unit: { type: "string", description: "Quantity unit" },
          quantity_value: { type: "number", description: "Quantity value" },
          reference_unit: { type: "string", description: "Reference unit" },
          reference_value: { type: "number", description: "Reference value" },
        },
      },

      user_agent: {
        type: "UserAgent",
        description: "User agent information",
        properties: {},
      },

      video_source: {
        type: "VideoSource",
        description: "Video source",
        properties: {
          format: { type: "string", description: "Video format" },
          height: { type: "number", description: "Video height" },
          mime_type: { type: "string", description: "MIME type" },
          url: { type: "string", description: "Video URL" },
          width: { type: "number", description: "Video width" },
        },
      },
    };
  }
}
