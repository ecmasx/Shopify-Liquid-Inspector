export interface ShopifyObjectDefinition {
  type: string;
  description: string;
  properties: { [key: string]: any };
  deprecated?: boolean;
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
      additional_checkout_buttons: {
        type: "AdditionalCheckoutButtons",
        description:
          "Returns true if a store has any payment providers with offsite checkouts, such as PayPal Express Checkout.",
        properties: {},
      },

      address: {
        type: "Address",
        description:
          "An address, such as a customer address or order shipping address.",
        properties: {
          address1: {
            type: "string",
            description: "First line of the address",
          },
          address2: {
            type: "string",
            description: "Second line of the address",
          },
          city: { type: "string", description: "City name" },
          company: { type: "string", description: "Company name" },
          country: { type: "country", description: "Country object" },
          country_code: { type: "string", description: "Country code" },
          first_name: { type: "string", description: "First name" },
          id: { type: "number", description: "Unique identifier" },
          last_name: { type: "string", description: "Last name" },
          name: { type: "string", description: "Full name" },
          phone: { type: "string", description: "Phone number" },
          province: { type: "string", description: "Province/state name" },
          province_code: { type: "string", description: "Province/state code" },
          street: { type: "string", description: "Complete street address" },
          summary: { type: "string", description: "Full formatted address" },
          url: { type: "string", description: "URL to manage this address" },
          zip: { type: "string", description: "Postal/ZIP code" },
        },
      },

      all_country_option_tags: {
        type: "AllCountryOptionTags",
        description:
          "Creates an <option> tag for each country with data-provinces attribute containing JSON-encoded array of subregions.",
        properties: {},
      },

      all_products: {
        type: "AllProducts",
        description:
          "All of the products on a store. Limited to 20 unique handles per page.",
        properties: {},
      },

      app: {
        type: "App",
        description:
          "An app object, usually used to access app-specific information for theme app extensions.",
        properties: {
          metafields: {
            type: "metafields",
            description: "The metafields owned by the app",
          },
        },
      },

      article: {
        type: "Article",
        description: "An article or blog post in a blog.",
        properties: {
          author: { type: "string", description: "Author name" },
          comment_post_url: {
            type: "string",
            description: "URL for posting comments",
          },
          comments: { type: "array<comment>", description: "Article comments" },
          comments_count: { type: "number", description: "Number of comments" },
          comments_enabled: {
            type: "boolean",
            description: "Whether comments are enabled",
          },
          content: { type: "string", description: "Full article content" },
          created_at: { type: "string", description: "Creation timestamp" },
          excerpt: { type: "string", description: "Article excerpt" },
          excerpt_or_content: {
            type: "string",
            description: "Excerpt if available, otherwise content",
          },
          handle: { type: "string", description: "URL handle" },
          id: { type: "string", description: "Unique identifier" },
          image: { type: "image", description: "Featured image" },
          metafields: {
            type: "metafields",
            description: "Associated metafields",
          },
          moderated: {
            type: "boolean",
            description: "Whether comments are moderated",
          },
          published_at: {
            type: "string",
            description: "Publication timestamp",
          },
          tags: { type: "array<string>", description: "Article tags" },
          template_suffix: { type: "string", description: "Template suffix" },
          title: { type: "string", description: "Article title" },
          updated_at: { type: "string", description: "Last update timestamp" },
          url: { type: "string", description: "Article URL" },
          user: { type: "user", description: "Author user object" },
        },
      },

      articles: {
        type: "Articles",
        description: "All articles across all blogs in the store.",
        properties: {},
      },

      block: {
        type: "Block",
        description: "Content and settings of a section block.",
        properties: {
          id: { type: "string", description: "Block identifier" },
          settings: { type: "object", description: "Block settings" },
          shopify_attributes: {
            type: "string",
            description: "Shopify editor attributes",
          },
          type: { type: "string", description: "Block type" },
        },
      },

      blog: {
        type: "Blog",
        description: "Information about a specific blog in the store.",
        properties: {
          all_tags: {
            type: "array<string>",
            description: "All tags used in blog",
          },
          articles: { type: "array<article>", description: "Blog articles" },
          articles_count: {
            type: "number",
            description: "Total number of articles",
          },
          comments_enabled: {
            type: "boolean",
            description: "Whether comments are enabled",
          },
          handle: { type: "string", description: "Blog handle" },
          id: { type: "number", description: "Unique identifier" },
          metafields: {
            type: "array<metafield>",
            description: "Associated metafields",
          },
          moderated: {
            type: "boolean",
            description: "Whether comments are moderated",
          },
          next_article: { type: "article", description: "Next article" },
          previous_article: {
            type: "article",
            description: "Previous article",
          },
          tags: {
            type: "array<string>",
            description: "Currently filtered tags",
          },
          template_suffix: { type: "string", description: "Template suffix" },
          title: { type: "string", description: "Blog title" },
          url: { type: "string", description: "Blog URL" },
        },
      },

      blogs: {
        type: "Blogs",
        description: "All blogs in the store.",
        properties: {},
      },

      brand: {
        type: "Brand",
        description: "Brand assets for the store.",
        properties: {
          colors: { type: "brand_color", description: "Brand colors" },
          cover_image: { type: "image", description: "Cover image" },
          favicon_url: { type: "image", description: "Favicon URL" },
          logo: { type: "image", description: "Brand logo" },
          metafields: {
            type: "metafields",
            description: "Associated metafields",
          },
          short_description: {
            type: "string",
            description: "Brand description",
          },
          slogan: { type: "string", description: "Brand slogan" },
          square_logo: { type: "image", description: "Square logo" },
        },
      },

      brand_color: {
        type: "BrandColor",
        description: "Colors defined as part of store's brand assets.",
        properties: {
          alpha: { type: "number", description: "Alpha transparency" },
          blue: { type: "number", description: "Blue value" },
          chroma: { type: "number", description: "Chroma value" },
          color_space: { type: "string", description: "Color space" },
          green: { type: "number", description: "Green value" },
          hue: { type: "number", description: "Hue value" },
          lightness: { type: "number", description: "Lightness value" },
          oklch: { type: "string", description: "OKLCH color string" },
          oklcha: { type: "string", description: "OKLCHA color string" },
          red: { type: "number", description: "Red value" },
          rgb: { type: "string", description: "RGB color string" },
          rgba: { type: "string", description: "RGBA color string" },
          saturation: { type: "number", description: "Saturation value" },
        },
      },

      canonical_url: {
        type: "CanonicalUrl",
        description: "The canonical URL for the current page.",
        properties: {},
      },

      cart: {
        type: "Cart",
        description: "A customer's cart.",
        properties: {
          attributes: { type: "object", description: "Cart attributes" },
          cart_level_discount_applications: {
            type: "array<discount_application>",
            description: "Cart-level discounts",
          },
          checkout_charge_amount: {
            type: "number",
            description: "Checkout charge amount",
          },
          currency: { type: "currency", description: "Cart currency" },
          discount_applications: {
            type: "array<discount_application>",
            description: "All discount applications",
          },
          duties_included: {
            type: "boolean",
            description: "Whether duties are included",
          },
          empty: { type: "boolean", description: "Whether cart is empty" },
          item_count: { type: "number", description: "Number of items" },
          items: { type: "array<line_item>", description: "Cart items" },
          items_subtotal_price: {
            type: "number",
            description: "Subtotal price",
          },
          note: { type: "string", description: "Cart note" },
          original_total_price: {
            type: "number",
            description: "Original total before discounts",
          },
          requires_shipping: {
            type: "boolean",
            description: "Whether shipping is required",
          },
          taxes_included: {
            type: "boolean",
            description: "Whether taxes are included",
          },
          total_discount: {
            type: "number",
            description: "Total discount amount",
          },
          total_price: { type: "number", description: "Total price" },
          total_weight: { type: "number", description: "Total weight" },
        },
      },

      checkout: {
        type: "Checkout",
        description: "A customer's checkout. (Deprecated for most pages)",
        properties: {
          applied_gift_cards: {
            type: "array<gift_card>",
            description: "Applied gift cards",
          },
          attributes: { type: "object", description: "Checkout attributes" },
          billing_address: { type: "address", description: "Billing address" },
          buyer_accepts_marketing: {
            type: "boolean",
            description: "Marketing acceptance",
          },
          cart_level_discount_applications: {
            type: "array<discount_application>",
            description: "Cart-level discounts",
          },
          currency: { type: "string", description: "Checkout currency" },
          customer: { type: "customer", description: "Customer information" },
          discount_applications: {
            type: "array<discount_application>",
            description: "All discounts",
          },
          discounts_amount: {
            type: "array<discount_application>",
            description: "Discount amounts",
          },
          discounts_savings: {
            type: "array<discount_application>",
            description: "Discount savings",
          },
          email: { type: "string", description: "Customer email" },
          gift_cards_amount: {
            type: "number",
            description: "Gift card amount applied",
          },
          id: { type: "number", description: "Checkout ID" },
          item_count: { type: "number", description: "Number of items" },
          line_items: {
            type: "array<line_item>",
            description: "Checkout items",
          },
          line_items_subtotal_price: {
            type: "number",
            description: "Items subtotal",
          },
          name: { type: "number", description: "Checkout name" },
          note: { type: "string", description: "Checkout note" },
          order: { type: "order", description: "Associated order" },
          order_id: { type: "string", description: "Order ID" },
          order_name: { type: "string", description: "Order name" },
          order_number: { type: "string", description: "Order number" },
          requires_shipping: {
            type: "boolean",
            description: "Requires shipping",
          },
          shipping_address: {
            type: "address",
            description: "Shipping address",
          },
          shipping_method: {
            type: "shipping_method",
            description: "Shipping method",
          },
          shipping_price: { type: "number", description: "Shipping cost" },
          tax_lines: {
            type: "array<tax_line>",
            description: "Tax information",
          },
          tax_price: { type: "number", description: "Tax amount" },
          total_price: { type: "number", description: "Total price" },
          transactions: {
            type: "array<transaction>",
            description: "Payment transactions",
          },
        },
      },

      closest: {
        type: "Closest",
        description: "Resources of different types closest to current context.",
        properties: {
          article: { type: "article", description: "Closest article" },
          blog: { type: "blog", description: "Closest blog" },
          collection: { type: "collection", description: "Closest collection" },
          metaobject: { type: "metaobject", description: "Closest metaobject" },
          page: { type: "page", description: "Closest page" },
          product: { type: "product", description: "Closest product" },
        },
      },

      collection: {
        type: "Collection",
        description: "A collection in a store.",
        properties: {
          all_products_count: {
            type: "number",
            description: "Total products in collection",
          },
          all_tags: {
            type: "array<string>",
            description: "All product tags in collection",
          },
          all_types: {
            type: "array<string>",
            description: "All product types in collection",
          },
          all_vendors: {
            type: "array<string>",
            description: "All vendors in collection",
          },
          current_type: {
            type: "string",
            description: "Currently filtered type",
          },
          current_vendor: {
            type: "string",
            description: "Currently filtered vendor",
          },
          default_sort_by: {
            type: "string",
            description: "Default sort order",
          },
          description: {
            type: "string",
            description: "Collection description",
          },
          featured_image: { type: "image", description: "Featured image" },
          filters: { type: "array<filter>", description: "Available filters" },
          handle: { type: "string", description: "Collection handle" },
          id: { type: "number", description: "Unique identifier" },
          image: { type: "image", description: "Collection image" },
          metafields: {
            type: "array<metafield>",
            description: "Associated metafields",
          },
          next_product: {
            type: "product",
            description: "Next product in collection",
          },
          previous_product: {
            type: "product",
            description: "Previous product in collection",
          },
          products: {
            type: "array<product>",
            description: "Products in collection",
          },
          products_count: {
            type: "number",
            description: "Number of products shown",
          },
          published_at: {
            type: "string",
            description: "Publication timestamp",
          },
          sort_by: { type: "string", description: "Current sort order" },
          sort_options: {
            type: "array<sort_option>",
            description: "Available sort options",
          },
          tags: {
            type: "array<string>",
            description: "Currently filtered tags",
          },
          template_suffix: { type: "string", description: "Template suffix" },
          title: { type: "string", description: "Collection title" },
          url: { type: "string", description: "Collection URL" },
        },
      },

      collections: {
        type: "Collections",
        description: "All collections on a store.",
        properties: {},
      },

      color: {
        type: "Color",
        description: "A color from a color setting.",
        properties: {
          alpha: { type: "number", description: "Alpha transparency (0-1)" },
          blue: { type: "number", description: "Blue component (0-255)" },
          chroma: { type: "number", description: "Chroma value" },
          color_space: {
            type: "string",
            description: "Color space (e.g., 'srgb')",
          },
          green: { type: "number", description: "Green component (0-255)" },
          hue: { type: "number", description: "Hue value (0-360)" },
          lightness: { type: "number", description: "Lightness percentage" },
          oklch: { type: "string", description: "OKLCH color representation" },
          oklcha: {
            type: "string",
            description: "OKLCHA color representation",
          },
          red: { type: "number", description: "Red component (0-255)" },
          rgb: { type: "string", description: "RGB color string" },
          rgba: { type: "string", description: "RGBA color string" },
          saturation: { type: "number", description: "Saturation percentage" },
        },
      },

      color_scheme: {
        type: "ColorScheme",
        description: "A color scheme from a color_scheme setting.",
        properties: {
          id: { type: "string", description: "Color scheme ID" },
          settings: { type: "object", description: "Color scheme settings" },
        },
      },

      color_scheme_group: {
        type: "ColorSchemeGroup",
        description: "A color scheme group from a color_scheme_group setting.",
        properties: {},
      },

      comment: {
        type: "Comment",
        description: "An article comment.",
        properties: {
          author: { type: "string", description: "Comment author" },
          content: { type: "string", description: "Comment content" },
          created_at: { type: "string", description: "Creation timestamp" },
          email: { type: "string", description: "Author email" },
          id: { type: "number", description: "Comment ID" },
          status: { type: "string", description: "Comment status" },
          updated_at: { type: "string", description: "Last update timestamp" },
          url: { type: "string", description: "Comment URL" },
        },
      },

      company: {
        type: "Company",
        description: "A company that a customer is purchasing for (B2B).",
        properties: {
          available_locations: {
            type: "array<company_location>",
            description: "Available locations",
          },
          available_locations_count: {
            type: "number",
            description: "Number of locations",
          },
          external_id: { type: "string", description: "External identifier" },
          id: { type: "number", description: "Company ID" },
          metafields: {
            type: "array<metafield>",
            description: "Associated metafields",
          },
          name: { type: "string", description: "Company name" },
        },
      },

      company_address: {
        type: "CompanyAddress",
        description: "Address of a company location (B2B).",
        properties: {
          address1: { type: "string", description: "First address line" },
          address2: { type: "string", description: "Second address line" },
          attention: { type: "string", description: "Attention line" },
          city: { type: "string", description: "City" },
          country: { type: "country", description: "Country object" },
          country_code: { type: "string", description: "Country code" },
          first_name: { type: "string", description: "First name" },
          id: { type: "number", description: "Address ID" },
          last_name: { type: "string", description: "Last name" },
          province: { type: "string", description: "Province/state" },
          province_code: { type: "string", description: "Province code" },
          street: { type: "string", description: "Complete street address" },
          zip: { type: "string", description: "Postal code" },
        },
      },

      company_location: {
        type: "CompanyLocation",
        description: "A location of the company for B2B purchases.",
        properties: {
          company: { type: "company", description: "Parent company" },
          current: {
            type: "boolean",
            description: "Whether this is current location",
          },
          external_id: { type: "string", description: "External identifier" },
          id: { type: "number", description: "Location ID" },
          metafields: {
            type: "array<metafield>",
            description: "Associated metafields",
          },
          name: { type: "string", description: "Location name" },
          shipping_address: {
            type: "company_address",
            description: "Shipping address",
          },
          tax_registration_id: {
            type: "number",
            description: "Tax registration ID",
          },
          url_to_set_as_current: {
            type: "string",
            description: "URL to set as current",
          },
        },
      },

      content_for_additional_checkout_buttons: {
        type: "ContentForAdditionalCheckoutButtons",
        description:
          "Returns checkout buttons for payment providers with offsite checkouts.",
        properties: {},
      },

      content_for_header: {
        type: "ContentForHeader",
        description:
          "Dynamically returns all scripts required by Shopify. Must be included in theme.liquid.",
        properties: {},
      },

      content_for_index: {
        type: "ContentForIndex",
        description:
          "Dynamically returns content of sections for the home page.",
        properties: {},
      },

      content_for_layout: {
        type: "ContentForLayout",
        description:
          "Dynamically returns content based on current template. Must be included in theme.liquid.",
        properties: {},
      },

      country: {
        type: "Country",
        description: "A country supported by store's localization options.",
        properties: {
          available_languages: {
            type: "array<shop_locale>",
            description: "Available languages",
          },
          continent: { type: "string", description: "Continent name" },
          currency: { type: "currency", description: "Country currency" },
          iso_code: { type: "string", description: "ISO country code" },
          market: { type: "market", description: "Associated market" },
          name: { type: "string", description: "Country name" },
          popular: {
            type: "boolean",
            description: "Whether country is popular",
          },
          unit_system: {
            type: "string",
            description: "Unit system (metric/imperial)",
          },
        },
      },

      country_option_tags: {
        type: "CountryOptionTags",
        description: "Creates <option> tags for countries in shipping zones.",
        properties: {},
      },

      currency: {
        type: "Currency",
        description: "Information about a currency.",
        properties: {
          iso_code: { type: "string", description: "ISO currency code" },
          name: { type: "string", description: "Currency name" },
          symbol: { type: "string", description: "Currency symbol" },
        },
      },

      current_page: {
        type: "CurrentPage",
        description: "Current page number for pagination.",
        properties: {},
      },

      current_tags: {
        type: "CurrentTags",
        description: "Currently applied tags for filtering.",
        properties: {},
      },

      customer: {
        type: "Customer",
        description: "A customer of the store.",
        properties: {
          accepts_marketing: {
            type: "boolean",
            description: "Marketing acceptance",
          },
          addresses: {
            type: "array<address>",
            description: "Customer addresses",
          },
          addresses_count: {
            type: "number",
            description: "Number of addresses",
          },
          b2b: { type: "boolean", description: "Whether customer is B2B" },
          company_available_locations: {
            type: "array<company_location>",
            description: "Available company locations",
          },
          company_available_locations_count: {
            type: "number",
            description: "Number of company locations",
          },
          current_company: { type: "company", description: "Current company" },
          current_location: {
            type: "company_location",
            description: "Current location",
          },
          default_address: { type: "address", description: "Default address" },
          email: { type: "string", description: "Customer email" },
          first_name: { type: "string", description: "First name" },
          has_account: {
            type: "boolean",
            description: "Whether customer has account",
          },
          has_avatar: {
            type: "boolean",
            description: "Whether customer has avatar",
          },
          id: { type: "number", description: "Customer ID" },
          last_name: { type: "string", description: "Last name" },
          last_order: { type: "order", description: "Most recent order" },
          name: { type: "string", description: "Full name" },
          orders: { type: "array<order>", description: "Customer orders" },
          orders_count: { type: "number", description: "Number of orders" },
          payment_methods: {
            type: "array<customer_payment_method>",
            description: "Saved payment methods",
          },
          phone: { type: "string", description: "Phone number" },
          store_credit_account: {
            type: "store_credit_account",
            description: "Store credit account",
          },
          tags: { type: "array<string>", description: "Customer tags" },
          tax_exempt: { type: "boolean", description: "Whether tax exempt" },
          total_spent: { type: "number", description: "Total amount spent" },
        },
      },

      customer_payment_method: {
        type: "CustomerPaymentMethod",
        description: "A customer's saved payment method.",
        properties: {
          payment_instrument_type: {
            type: "string",
            description: "Type of payment instrument",
          },
          token: { type: "string", description: "Payment method token" },
        },
      },

      discount: {
        type: "Discount",
        description:
          "A discount applied to cart, line item, or order. Replaced by discount_allocation and discount_application.",
        deprecated: true,
        properties: {
          amount: { type: "number", description: "Discount amount" },
          code: { type: "string", description: "Discount code" },
          savings: { type: "number", description: "Amount saved" },
          title: { type: "string", description: "Discount title" },
          total_amount: {
            type: "number",
            description: "Total discount amount",
          },
          total_savings: { type: "number", description: "Total savings" },
          type: { type: "string", description: "Discount type" },
        },
      },

      discount_allocation: {
        type: "DiscountAllocation",
        description: "Information about how a discount affects an item.",
        properties: {
          amount: { type: "number", description: "Allocated discount amount" },
          discount_application: {
            type: "discount_application",
            description: "Related discount application",
          },
        },
      },

      discount_application: {
        type: "DiscountApplication",
        description: "Information about the intent of a discount.",
        properties: {
          target_selection: {
            type: "string",
            description: "How targets are selected",
          },
          target_type: { type: "string", description: "Type of target" },
          title: { type: "string", description: "Discount title" },
          total_allocated_amount: {
            type: "number",
            description: "Total allocated amount",
          },
          type: { type: "string", description: "Application type" },
          value: { type: "number", description: "Discount value" },
          value_type: {
            type: "string",
            description: "Value type (percentage/fixed_amount)",
          },
        },
      },

      external_video: {
        type: "ExternalVideo",
        description: "Information about external video from YouTube or Vimeo.",
        properties: {
          alt: { type: "string", description: "Alt text" },
          aspect_ratio: { type: "number", description: "Video aspect ratio" },
          external_id: { type: "string", description: "External video ID" },
          host: { type: "string", description: "Video host (youtube/vimeo)" },
          id: { type: "number", description: "Internal ID" },
          media_type: { type: "string", description: "Media type" },
          position: { type: "number", description: "Position in media array" },
          preview_image: { type: "image", description: "Preview image" },
        },
      },

      filter: {
        type: "Filter",
        description: "A storefront filter.",
        properties: {
          active_values: {
            type: "array<filter_value>",
            description: "Currently active values",
          },
          false_value: {
            type: "filter_value",
            description: "False value for boolean filters",
          },
          inactive_values: {
            type: "array<filter_value>",
            description: "Inactive values",
          },
          label: { type: "string", description: "Filter label" },
          max_value: {
            type: "filter_value",
            description: "Maximum value for range filters",
          },
          min_value: {
            type: "filter_value",
            description: "Minimum value for range filters",
          },
          operator: { type: "string", description: "Filter operator" },
          param_name: { type: "string", description: "URL parameter name" },
          presentation: {
            type: "string",
            description: "How filter should be presented",
          },
          range_max: { type: "number", description: "Maximum range value" },
          true_value: {
            type: "filter_value",
            description: "True value for boolean filters",
          },
          type: { type: "string", description: "Filter type" },
          url_to_remove: {
            type: "string",
            description: "URL to remove filter",
          },
          values: {
            type: "array<filter_value>",
            description: "All filter values",
          },
        },
      },

      filter_value: {
        type: "FilterValue",
        description: "A specific value of a filter.",
        properties: {
          active: { type: "boolean", description: "Whether value is active" },
          count: {
            type: "number",
            description: "Number of products with this value",
          },
          image: { type: "image", description: "Associated image" },
          label: { type: "string", description: "Display label" },
          param_name: { type: "string", description: "URL parameter name" },
          swatch: { type: "swatch", description: "Color/image swatch" },
          url_to_add: { type: "string", description: "URL to add this filter" },
          url_to_remove: {
            type: "string",
            description: "URL to remove this filter",
          },
          value: { type: "string", description: "Filter value" },
        },
      },

      filter_value_display: {
        type: "FilterValueDisplay",
        description:
          "Visual representation of filter value. Replaced by swatch.",
        deprecated: true,
        properties: {
          type: { type: "string", description: "Display type" },
          value: { type: "any", description: "Display value" },
        },
      },

      focal_point: {
        type: "FocalPoint",
        description: "Focal point for an image to remain visible when cropped.",
        properties: {
          x: { type: "number", description: "X coordinate percentage" },
          y: { type: "number", description: "Y coordinate percentage" },
        },
      },

      font: {
        type: "Font",
        description: "A font from a font_picker setting.",
        properties: {
          baseline_ratio: { type: "number", description: "Baseline ratio" },
          fallback_families: {
            type: "string",
            description: "Fallback font families",
          },
          family: { type: "string", description: "Font family name" },
          style: { type: "string", description: "Font style" },
          system: {
            type: "boolean",
            description: "Whether it's a system font",
          },
          variants: { type: "array<font>", description: "Font variants" },
          weight: { type: "number", description: "Font weight" },
        },
      },

      forloop: {
        type: "ForLoop",
        description: "Information about a parent for loop.",
        properties: {
          first: { type: "boolean", description: "Whether first iteration" },
          index: { type: "number", description: "Current iteration (1-based)" },
          index0: {
            type: "number",
            description: "Current iteration (0-based)",
          },
          last: { type: "boolean", description: "Whether last iteration" },
          length: { type: "number", description: "Total iterations" },
          parentloop: { type: "forloop", description: "Parent loop object" },
          rindex: { type: "number", description: "Reverse index (1-based)" },
          rindex0: { type: "number", description: "Reverse index (0-based)" },
        },
      },

      form: {
        type: "Form",
        description: "Information about a form created by form tag.",
        properties: {
          address1: { type: "string", description: "Address line 1" },
          address2: { type: "string", description: "Address line 2" },
          author: { type: "string", description: "Author name" },
          body: { type: "string", description: "Form body content" },
          city: { type: "string", description: "City" },
          company: { type: "string", description: "Company" },
          country: { type: "string", description: "Country" },
          email: { type: "string", description: "Email address" },
          errors: { type: "form_errors", description: "Form errors" },
          first_name: { type: "string", description: "First name" },
          id: { type: "string", description: "Form ID" },
          last_name: { type: "string", description: "Last name" },
          message: { type: "string", description: "Message content" },
          name: { type: "string", description: "Full name" },
          password_needed: {
            type: "boolean",
            description: "Whether password needed",
          },
          phone: { type: "string", description: "Phone number" },
          posted_successfully: {
            type: "boolean",
            description: "Whether posted successfully",
          },
          province: { type: "string", description: "Province/state" },
          set_as_default_checkbox: {
            type: "string",
            description: "Default checkbox HTML",
          },
          zip: { type: "string", description: "ZIP/postal code" },
        },
      },

      form_errors: {
        type: "FormErrors",
        description: "Error category strings for form errors.",
        properties: {
          messages: { type: "array<string>", description: "Error messages" },
          translated_fields: {
            type: "array<string>",
            description: "Translated field names",
          },
        },
      },

      fulfillment: {
        type: "Fulfillment",
        description: "Order fulfillment information.",
        properties: {
          created_at: { type: "string", description: "Creation timestamp" },
          fulfillment_line_items: {
            type: "array<line_item>",
            description: "Fulfilled items",
          },
          item_count: { type: "number", description: "Number of items" },
          tracking_company: { type: "string", description: "Shipping company" },
          tracking_number: { type: "string", description: "Tracking number" },
          tracking_numbers: {
            type: "array<string>",
            description: "Multiple tracking numbers",
          },
          tracking_url: { type: "string", description: "Tracking URL" },
        },
      },

      generic_file: {
        type: "GenericFile",
        description:
          "A file from file_reference metafield that's not image or video.",
        properties: {
          alt: { type: "string", description: "Alt text" },
          id: { type: "number", description: "File ID" },
          media_type: { type: "string", description: "Media type" },
          position: { type: "number", description: "Position in array" },
          preview_image: { type: "image", description: "Preview image" },
          url: { type: "string", description: "File URL" },
        },
      },

      gift_card: {
        type: "GiftCard",
        description: "A gift card issued to customer or recipient.",
        properties: {
          balance: { type: "number", description: "Current balance" },
          code: { type: "string", description: "Gift card code" },
          currency: { type: "string", description: "Currency" },
          customer: { type: "customer", description: "Associated customer" },
          enabled: { type: "boolean", description: "Whether enabled" },
          expired: { type: "boolean", description: "Whether expired" },
          expires_on: { type: "string", description: "Expiration date" },
          initial_value: { type: "number", description: "Initial value" },
          last_four_characters: {
            type: "string",
            description: "Last 4 characters of code",
          },
          message: { type: "string", description: "Gift message" },
          pass_url: { type: "string", description: "Apple Wallet pass URL" },
          product: { type: "product", description: "Associated product" },
          properties: { type: "object", description: "Custom properties" },
          qr_identifier: { type: "string", description: "QR code identifier" },
          recipient: { type: "recipient", description: "Gift recipient" },
          send_on: { type: "string", description: "Send date" },
          template_suffix: { type: "string", description: "Template suffix" },
          url: { type: "string", description: "Gift card URL" },
        },
      },

      group: {
        type: "Group",
        description: "A group of rules for robots.txt file.",
        properties: {
          rules: { type: "array<rule>", description: "Robots rules" },
          sitemap: { type: "sitemap", description: "Sitemap information" },
          user_agent: {
            type: "user_agent",
            description: "User agent information",
          },
        },
      },

      handle: {
        type: "Handle",
        description: "Handle of resource associated with current template.",
        properties: {},
      },

      image: {
        type: "Image",
        description: "An image, such as product or collection image.",
        properties: {
          alt: { type: "string", description: "Alt text" },
          aspect_ratio: { type: "number", description: "Image aspect ratio" },
          attached_to_variant: {
            type: "boolean",
            description: "Whether attached to variant",
          },
          height: { type: "number", description: "Image height" },
          id: { type: "number", description: "Image ID" },
          media_type: { type: "string", description: "Media type" },
          position: { type: "number", description: "Position in array" },
          presentation: {
            type: "image_presentation",
            description: "Presentation settings",
          },
          preview_image: { type: "image", description: "Preview image" },
          product_id: { type: "number", description: "Associated product ID" },
          src: { type: "string", description: "Image URL" },
          variants: {
            type: "array<variant>",
            description: "Associated variants",
          },
          width: { type: "number", description: "Image width" },
        },
      },

      image_presentation: {
        type: "ImagePresentation",
        description: "Presentation settings for an image.",
        properties: {
          focal_point: {
            type: "focal_point",
            description: "Image focal point",
          },
        },
      },

      images: {
        type: "Images",
        description: "All images uploaded to store.",
        properties: {},
      },

      line_item: {
        type: "LineItem",
        description:
          "A line in cart, checkout, or order representing a product variant.",
        properties: {
          discount_allocations: {
            type: "array<discount_allocation>",
            description: "Applied discounts",
          },
          error_message: {
            type: "string",
            description: "Error message if any",
          },
          final_line_price: {
            type: "number",
            description: "Final line price after discounts",
          },
          final_price: {
            type: "number",
            description: "Final unit price after discounts",
          },
          fulfillment: {
            type: "fulfillment",
            description: "Fulfillment information",
          },
          fulfillment_service: {
            type: "string",
            description: "Fulfillment service",
          },
          gift_card: {
            type: "boolean",
            description: "Whether item is gift card",
          },
          grams: { type: "number", description: "Weight in grams" },
          id: { type: "number", description: "Line item ID" },
          image: { type: "image", description: "Product image" },
          item_components: {
            type: "array<line_item>",
            description: "Component items",
          },
          key: { type: "string", description: "Unique key" },
          line_level_discount_allocations: {
            type: "array<discount_allocation>",
            description: "Line-level discounts",
          },
          line_level_total_discount: {
            type: "number",
            description: "Total line-level discount",
          },
          message: { type: "string", description: "Associated message" },
          options_with_values: {
            type: "object",
            description: "Variant options",
          },
          original_line_price: {
            type: "number",
            description: "Original line price",
          },
          original_price: {
            type: "number",
            description: "Original unit price",
          },
          product: { type: "product", description: "Associated product" },
          product_id: { type: "number", description: "Product ID" },
          properties: { type: "object", description: "Custom properties" },
          quantity: { type: "number", description: "Quantity" },
          requires_shipping: {
            type: "boolean",
            description: "Whether requires shipping",
          },
          selling_plan_allocation: {
            type: "selling_plan_allocation",
            description: "Selling plan info",
          },
          sku: { type: "string", description: "SKU" },
          successfully_fulfilled_quantity: {
            type: "number",
            description: "Fulfilled quantity",
          },
          tax_lines: {
            type: "array<tax_line>",
            description: "Tax information",
          },
          taxable: { type: "boolean", description: "Whether taxable" },
          title: { type: "string", description: "Line item title" },
          unit_price: { type: "number", description: "Unit price" },
          unit_price_measurement: {
            type: "unit_price_measurement",
            description: "Unit measurement",
          },
          url: { type: "string", description: "Product URL" },
          url_to_remove: {
            type: "string",
            description: "URL to remove from cart",
          },
          variant: { type: "variant", description: "Product variant" },
          variant_id: { type: "number", description: "Variant ID" },
          vendor: { type: "string", description: "Vendor name" },
        },
      },

      link: {
        type: "Link",
        description: "A link in a menu.",
        properties: {
          active: { type: "boolean", description: "Whether link is active" },
          child_active: {
            type: "boolean",
            description: "Whether child is active",
          },
          child_current: {
            type: "boolean",
            description: "Whether child is current",
          },
          current: { type: "boolean", description: "Whether link is current" },
          handle: { type: "string", description: "Link handle" },
          levels: { type: "number", description: "Number of nested levels" },
          links: { type: "array<link>", description: "Child links" },
          object: { type: "any", description: "Linked object" },
          title: { type: "string", description: "Link title" },
          type: { type: "string", description: "Link type" },
          url: { type: "string", description: "Link URL" },
        },
      },

      linklist: {
        type: "Linklist",
        description: "A menu in store.",
        properties: {
          handle: { type: "string", description: "Menu handle" },
          levels: { type: "number", description: "Number of levels" },
          links: { type: "array<link>", description: "Menu links" },
          title: { type: "string", description: "Menu title" },
        },
      },

      linklists: {
        type: "Linklists",
        description: "All menus in store.",
        properties: {},
      },

      localization: {
        type: "Localization",
        description:
          "Information about countries and languages available on store.",
        properties: {
          available_countries: {
            type: "array<country>",
            description: "Available countries",
          },
          available_languages: {
            type: "array<shop_locale>",
            description: "Available languages",
          },
          country: { type: "country", description: "Current country" },
          language: { type: "shop_locale", description: "Current language" },
          market: { type: "market", description: "Current market" },
        },
      },

      location: {
        type: "Location",
        description: "A store location with local pickup enabled.",
        properties: {
          address: { type: "address", description: "Location address" },
          id: { type: "number", description: "Location ID" },
          latitude: { type: "number", description: "Latitude coordinate" },
          longitude: { type: "number", description: "Longitude coordinate" },
          metafields: {
            type: "metafields",
            description: "Associated metafields",
          },
          name: { type: "string", description: "Location name" },
        },
      },

      market: {
        type: "Market",
        description: "A group of regions that merchant targets for sales.",
        properties: {
          handle: { type: "string", description: "Market handle" },
          id: { type: "string", description: "Market ID" },
          metafields: {
            type: "array<metafield>",
            description: "Associated metafields",
          },
        },
      },

      measurement: {
        type: "Measurement",
        description:
          "A measurement from dimension, volume, or weight metafield.",
        properties: {
          type: { type: "string", description: "Measurement type" },
          unit: { type: "string", description: "Unit of measurement" },
          value: { type: "number", description: "Measurement value" },
        },
      },

      media: {
        type: "Media",
        description:
          "Abstract media object representing image, model, video, or external_video.",
        properties: {
          alt: { type: "string", description: "Alt text" },
          id: { type: "number", description: "Media ID" },
          media_type: { type: "string", description: "Media type" },
          position: { type: "number", description: "Position in array" },
          preview_image: { type: "image", description: "Preview image" },
        },
      },

      metafield: {
        type: "Metafield",
        description: "A metafield attached to parent object.",
        properties: {
          list: {
            type: "boolean",
            description: "Whether metafield is list type",
          },
          type: { type: "string", description: "Metafield type" },
          value: {
            type: "any",
            description: "Metafield value (type varies by metafield type)",
          },
        },
      },

      metaobject: {
        type: "Metaobject",
        description: "A metaobject entry with values for defined fields.",
        properties: {
          system: {
            type: "metaobject_system",
            description: "System information",
          },
        },
      },

      metaobject_definition: {
        type: "MetaobjectDefinition",
        description: "Defines structure of metaobject type.",
        properties: {
          values: {
            type: "array<metaobject>",
            description: "Metaobject entries",
          },
          values_count: { type: "number", description: "Number of entries" },
        },
      },

      metaobject_system: {
        type: "MetaobjectSystem",
        description: "Basic system information about metaobject.",
        properties: {
          handle: { type: "string", description: "Metaobject handle" },
          id: { type: "number", description: "Metaobject ID" },
          type: { type: "string", description: "Metaobject type" },
          url: { type: "string", description: "Metaobject URL" },
        },
      },

      metaobjects: {
        type: "Metaobjects",
        description: "All metaobjects in store.",
        properties: {},
      },

      model: {
        type: "Model",
        description: "A 3D model uploaded as product media.",
        properties: {
          alt: { type: "string", description: "Alt text" },
          id: { type: "number", description: "Model ID" },
          media_type: { type: "string", description: "Media type" },
          position: { type: "number", description: "Position in array" },
          preview_image: { type: "image", description: "Preview image" },
          sources: {
            type: "array<model_source>",
            description: "Model source files",
          },
        },
      },

      model_source: {
        type: "ModelSource",
        description: "A model source file.",
        properties: {
          format: { type: "string", description: "File format" },
          mime_type: { type: "string", description: "MIME type" },
          url: { type: "string", description: "File URL" },
        },
      },

      money: {
        type: "Money",
        description: "Money value in customer's local currency.",
        properties: {
          currency: { type: "currency", description: "Currency information" },
        },
      },

      order: {
        type: "Order",
        description: "An order.",
        properties: {
          attributes: { type: "object", description: "Order attributes" },
          billing_address: { type: "address", description: "Billing address" },
          cancel_reason: { type: "string", description: "Cancellation reason" },
          cancel_reason_label: {
            type: "string",
            description: "Cancellation reason label",
          },
          cancelled: { type: "boolean", description: "Whether cancelled" },
          cancelled_at: {
            type: "string",
            description: "Cancellation timestamp",
          },
          cart_level_discount_applications: {
            type: "array<discount_application>",
            description: "Cart discounts",
          },
          confirmation_number: {
            type: "string",
            description: "Confirmation number",
          },
          created_at: { type: "string", description: "Creation timestamp" },
          customer: { type: "customer", description: "Customer information" },
          customer_order_url: {
            type: "string",
            description: "Customer order URL",
          },
          customer_url: { type: "string", description: "Customer URL" },
          discount_applications: {
            type: "array<discount_application>",
            description: "All discounts",
          },
          email: { type: "string", description: "Customer email" },
          financial_status: { type: "string", description: "Financial status" },
          financial_status_label: {
            type: "any",
            description: "Financial status label",
          },
          fulfillment_status: {
            type: "string",
            description: "Fulfillment status",
          },
          fulfillment_status_label: {
            type: "string",
            description: "Fulfillment status label",
          },
          id: { type: "number", description: "Order ID" },
          item_count: { type: "number", description: "Number of items" },
          line_items: { type: "array<line_item>", description: "Order items" },
          line_items_subtotal_price: {
            type: "number",
            description: "Items subtotal",
          },
          metafields: {
            type: "metafields",
            description: "Associated metafields",
          },
          name: { type: "string", description: "Order name" },
          note: { type: "string", description: "Order note" },
          order_number: { type: "number", description: "Order number" },
          order_status_url: { type: "string", description: "Order status URL" },
          phone: { type: "string", description: "Customer phone" },
          pickup_in_store: {
            type: "boolean",
            description: "Whether pickup in store",
          },
          shipping_address: {
            type: "address",
            description: "Shipping address",
          },
          shipping_methods: {
            type: "array<shipping_method>",
            description: "Shipping methods",
          },
          shipping_price: { type: "number", description: "Shipping cost" },
          subtotal_line_items: {
            type: "array<line_item>",
            description: "Subtotal items",
          },
          subtotal_price: { type: "number", description: "Subtotal price" },
          tags: { type: "array<string>", description: "Order tags" },
          tax_lines: {
            type: "array<tax_line>",
            description: "Tax information",
          },
          tax_price: { type: "number", description: "Tax amount" },
          total_discounts: { type: "number", description: "Total discounts" },
          total_duties: { type: "number", description: "Total duties" },
          total_net_amount: { type: "number", description: "Net amount" },
          total_price: { type: "number", description: "Total price" },
          total_refunded_amount: {
            type: "number",
            description: "Refunded amount",
          },
          transactions: {
            type: "array<transaction>",
            description: "Payment transactions",
          },
        },
      },

      page: {
        type: "Page",
        description: "A page on store.",
        properties: {
          author: { type: "string", description: "Page author" },
          content: { type: "string", description: "Page content" },
          handle: { type: "string", description: "Page handle" },
          id: { type: "number", description: "Page ID" },
          metafields: {
            type: "metafields",
            description: "Associated metafields",
          },
          published_at: {
            type: "string",
            description: "Publication timestamp",
          },
          template_suffix: { type: "string", description: "Template suffix" },
          title: { type: "string", description: "Page title" },
          url: { type: "string", description: "Page URL" },
        },
      },

      page_description: {
        type: "PageDescription",
        description: "Meta description of current page.",
        properties: {},
      },

      page_image: {
        type: "PageImage",
        description:
          "Image for search engine listings and social media previews.",
        properties: {},
      },

      page_title: {
        type: "PageTitle",
        description: "Page title of current page.",
        properties: {},
      },

      pages: {
        type: "Pages",
        description: "All pages on store.",
        properties: {},
      },

      paginate: {
        type: "Paginate",
        description: "Information about pagination inside paginate tags.",
        properties: {
          current_offset: { type: "number", description: "Current offset" },
          current_page: { type: "number", description: "Current page number" },
          items: { type: "number", description: "Number of items" },
          next: { type: "part", description: "Next page part" },
          page_param: { type: "string", description: "Page parameter name" },
          page_size: { type: "number", description: "Items per page" },
          pages: { type: "number", description: "Total pages" },
          parts: { type: "array<part>", description: "Pagination parts" },
          previous: { type: "part", description: "Previous page part" },
        },
      },

      part: {
        type: "Part",
        description: "A part in pagination navigation.",
        properties: {
          is_link: { type: "boolean", description: "Whether part is link" },
          title: { type: "string", description: "Part title" },
          url: { type: "string", description: "Part URL" },
        },
      },

      pending_payment_instruction_input: {
        type: "PendingPaymentInstructionInput",
        description: "Payment information for offline transaction completion.",
        properties: {
          header: { type: "string", description: "Instruction header" },
          value: { type: "string", description: "Instruction value" },
        },
      },

      policy: {
        type: "Policy",
        description: "A store policy.",
        properties: {
          body: { type: "string", description: "Policy content" },
          id: { type: "string", description: "Policy ID" },
          title: { type: "string", description: "Policy title" },
          url: { type: "string", description: "Policy URL" },
        },
      },

      powered_by_link: {
        type: "PoweredByLink",
        description: "HTML link to localized shopify.com.",
        properties: {},
      },

      predictive_search: {
        type: "PredictiveSearch",
        description: "Results from predictive search query.",
        properties: {
          performed: {
            type: "boolean",
            description: "Whether search was performed",
          },
          resources: {
            type: "predictive_search_resources",
            description: "Search results",
          },
          terms: { type: "string", description: "Search terms" },
          types: {
            type: "array<string>",
            description: "Resource types searched",
          },
        },
      },

      predictive_search_resources: {
        type: "PredictiveSearchResources",
        description: "Arrays of objects for each resource type from search.",
        properties: {
          articles: { type: "array<article>", description: "Article results" },
          collections: {
            type: "array<collection>",
            description: "Collection results",
          },
          pages: { type: "array<page>", description: "Page results" },
          products: { type: "array<product>", description: "Product results" },
        },
      },

      product: {
        type: "Product",
        description: "A product in the store.",
        properties: {
          available: {
            type: "boolean",
            description: "Whether product is available",
          },
          category: {
            type: "taxonomy_category",
            description: "Product category",
          },
          collections: {
            type: "array<collection>",
            description: "Product collections",
          },
          compare_at_price: { type: "number", description: "Compare at price" },
          compare_at_price_max: {
            type: "number",
            description: "Highest compare price",
          },
          compare_at_price_min: {
            type: "number",
            description: "Lowest compare price",
          },
          compare_at_price_varies: {
            type: "boolean",
            description: "Whether compare price varies",
          },
          content: { type: "string", description: "Product description HTML" },
          created_at: { type: "string", description: "Creation timestamp" },
          description: { type: "string", description: "Product description" },
          featured_image: { type: "image", description: "Featured image" },
          featured_media: { type: "media", description: "Featured media" },
          first_available_variant: {
            type: "variant",
            description: "First available variant",
          },
          gift_card: {
            type: "boolean",
            description: "Whether product is gift card",
          },
          handle: { type: "string", description: "Product handle" },
          has_only_default_variant: {
            type: "boolean",
            description: "Whether has only default variant",
          },
          id: { type: "number", description: "Product ID" },
          images: { type: "array<image>", description: "Product images" },
          media: { type: "array<media>", description: "Product media" },
          metafields: {
            type: "metafields",
            description: "Associated metafields",
          },
          options: { type: "array<string>", description: "Option names" },
          options_by_name: { type: "object", description: "Options by name" },
          options_with_values: {
            type: "array<product_option>",
            description: "Options with values",
          },
          price: { type: "number", description: "Product price" },
          price_max: { type: "number", description: "Highest price" },
          price_min: { type: "number", description: "Lowest price" },
          price_varies: {
            type: "boolean",
            description: "Whether price varies",
          },
          published_at: {
            type: "string",
            description: "Publication timestamp",
          },
          quantity_price_breaks_configured: {
            type: "boolean",
            description: "Whether quantity breaks configured",
          },
          requires_selling_plan: {
            type: "boolean",
            description: "Whether requires selling plan",
          },
          selected_or_first_available_selling_plan_allocation: {
            type: "selling_plan_allocation",
            description: "Selected/first selling plan",
          },
          selected_or_first_available_variant: {
            type: "variant",
            description: "Selected/first variant",
          },
          selected_selling_plan: {
            type: "selling_plan",
            description: "Selected selling plan",
          },
          selected_selling_plan_allocation: {
            type: "selling_plan_allocation",
            description: "Selected selling plan allocation",
          },
          selected_variant: {
            type: "variant",
            description: "Selected variant",
          },
          selling_plan_groups: {
            type: "array<selling_plan_group>",
            description: "Selling plan groups",
          },
          tags: { type: "array<string>", description: "Product tags" },
          template_suffix: { type: "string", description: "Template suffix" },
          title: { type: "string", description: "Product title" },
          type: { type: "string", description: "Product type" },
          url: { type: "string", description: "Product URL" },
          variants: { type: "array<variant>", description: "Product variants" },
          variants_count: { type: "number", description: "Number of variants" },
          vendor: { type: "string", description: "Product vendor" },
        },
      },

      product_option: {
        type: "ProductOption",
        description: "A product option like size or color.",
        properties: {
          name: { type: "string", description: "Option name" },
          position: { type: "number", description: "Option position" },
          selected_value: { type: "string", description: "Selected value" },
          values: {
            type: "array<product_option_value>",
            description: "Option values",
          },
        },
      },

      product_option_value: {
        type: "ProductOptionValue",
        description: 'A product option value like "red" for color.',
        properties: {
          available: {
            type: "boolean",
            description: "Whether value is available",
          },
          id: { type: "number", description: "Value ID" },
          name: { type: "string", description: "Value name" },
          product_url: {
            type: "string",
            description: "Product URL with this value",
          },
          selected: {
            type: "boolean",
            description: "Whether value is selected",
          },
          swatch: { type: "swatch", description: "Color/image swatch" },
          variant: { type: "variant", description: "Associated variant" },
        },
      },

      quantity_price_break: {
        type: "QuantityPriceBreak",
        description: "Per-unit price when purchasing minimum quantity or more.",
        properties: {
          minimum_quantity: {
            type: "number",
            description: "Minimum quantity required",
          },
          price: { type: "number", description: "Price per unit" },
        },
      },

      quantity_rule: {
        type: "QuantityRule",
        description: "Variant order quantity rule.",
        properties: {
          increment: { type: "number", description: "Quantity increment" },
          max: { type: "number", description: "Maximum quantity" },
          min: { type: "number", description: "Minimum quantity" },
        },
      },

      rating: {
        type: "Rating",
        description: "Information for rating type metafield.",
        properties: {
          rating: { type: "number", description: "Rating value" },
          scale_max: { type: "number", description: "Maximum scale value" },
          scale_min: { type: "number", description: "Minimum scale value" },
        },
      },

      recipient: {
        type: "Recipient",
        description: "Recipient associated with gift card.",
        properties: {
          email: { type: "string", description: "Recipient email" },
          name: { type: "string", description: "Recipient name" },
          nickname: { type: "string", description: "Recipient nickname" },
        },
      },

      recommendations: {
        type: "Recommendations",
        description:
          "Product recommendations based on sales data and relationships.",
        properties: {
          intent: { type: "string", description: "Recommendation intent" },
          performed: {
            type: "boolean",
            description: "Whether recommendations performed",
          },
          products: {
            type: "array<product>",
            description: "Recommended products",
          },
          products_count: { type: "number", description: "Number of products" },
        },
      },

      request: {
        type: "Request",
        description: "Information about current URL and page.",
        properties: {
          design_mode: {
            type: "boolean",
            description: "Whether in design mode",
          },
          host: { type: "string", description: "Request host" },
          locale: { type: "shop_locale", description: "Current locale" },
          origin: { type: "string", description: "Request origin" },
          page_type: { type: "string", description: "Current page type" },
          path: { type: "string", description: "Request path" },
          visual_preview_mode: {
            type: "boolean",
            description: "Whether in visual preview",
          },
        },
      },

      robots: {
        type: "Robots",
        description: "Default rule groups for robots.txt file.",
        properties: {
          default_groups: {
            type: "array<group>",
            description: "Default robot groups",
          },
        },
      },

      routes: {
        type: "Routes",
        description: "Generate standard URLs for storefront.",
        properties: {
          account_addresses_url: {
            type: "string",
            description: "Account addresses URL",
          },
          account_login_url: { type: "string", description: "Login URL" },
          account_logout_url: { type: "string", description: "Logout URL" },
          account_recover_url: {
            type: "string",
            description: "Password recovery URL",
          },
          account_register_url: {
            type: "string",
            description: "Registration URL",
          },
          account_url: { type: "string", description: "Account URL" },
          all_products_collection_url: {
            type: "string",
            description: "All products URL",
          },
          cart_add_url: { type: "string", description: "Cart add URL" },
          cart_change_url: { type: "string", description: "Cart change URL" },
          cart_clear_url: { type: "string", description: "Cart clear URL" },
          cart_update_url: { type: "string", description: "Cart update URL" },
          cart_url: { type: "string", description: "Cart URL" },
          collections_url: { type: "string", description: "Collections URL" },
          predictive_search_url: {
            type: "string",
            description: "Predictive search URL",
          },
          product_recommendations_url: {
            type: "string",
            description: "Product recommendations URL",
          },
          root_url: { type: "string", description: "Root URL" },
          search_url: { type: "string", description: "Search URL" },
          storefront_login_url: {
            type: "string",
            description: "Storefront login URL",
          },
        },
      },

      rule: {
        type: "Rule",
        description: "A rule for robots.txt file.",
        properties: {
          directive: {
            type: "string",
            description: "Rule directive (Allow/Disallow)",
          },
          value: { type: "string", description: "URL path value" },
        },
      },

      script: {
        type: "Script",
        description:
          "Information about Shopify Script. Scripts will be sunset August 28, 2025.",
        deprecated: true,
        properties: {
          id: { type: "number", description: "Script ID" },
          name: { type: "string", description: "Script name" },
        },
      },

      scripts: {
        type: "Scripts",
        description:
          "Active scripts of each type. Scripts will be sunset August 28, 2025.",
        deprecated: true,
        properties: {
          cart_calculate_line_items: {
            type: "script",
            description: "Cart calculation script",
          },
        },
      },

      search: {
        type: "Search",
        description: "Information about storefront search query.",
        properties: {
          default_sort_by: {
            type: "string",
            description: "Default sort order",
          },
          filters: { type: "array<filter>", description: "Available filters" },
          performed: {
            type: "boolean",
            description: "Whether search was performed",
          },
          results: { type: "any", description: "Search results" },
          results_count: { type: "number", description: "Number of results" },
          sort_by: { type: "any", description: "Current sort order" },
          sort_options: {
            type: "array<sort_option>",
            description: "Available sort options",
          },
          terms: { type: "string", description: "Search terms" },
          types: {
            type: "array<string>",
            description: "Resource types searched",
          },
        },
      },

      section: {
        type: "Section",
        description: "Properties and settings of a section.",
        properties: {
          blocks: { type: "array<block>", description: "Section blocks" },
          id: { type: "string", description: "Section ID" },
          index: { type: "number", description: "Section index (1-based)" },
          index0: { type: "number", description: "Section index (0-based)" },
          location: { type: "string", description: "Section location" },
          settings: { type: "any", description: "Section settings" },
        },
      },

      selling_plan: {
        type: "SellingPlan",
        description: "Information about selling plan intent.",
        properties: {
          checkout_charge: {
            type: "selling_plan_checkout_charge",
            description: "Checkout charge info",
          },
          description: { type: "string", description: "Plan description" },
          group_id: { type: "string", description: "Group ID" },
          id: { type: "number", description: "Plan ID" },
          name: { type: "string", description: "Plan name" },
          options: {
            type: "array<selling_plan_option>",
            description: "Plan options",
          },
          price_adjustments: {
            type: "array<selling_plan_price_adjustment>",
            description: "Price adjustments",
          },
          recurring_deliveries: {
            type: "boolean",
            description: "Whether recurring deliveries",
          },
          selected: {
            type: "boolean",
            description: "Whether plan is selected",
          },
        },
      },

      selling_plan_allocation: {
        type: "SellingPlanAllocation",
        description: "How selling plan affects line item.",
        properties: {
          checkout_charge_amount: {
            type: "number",
            description: "Checkout charge amount",
          },
          compare_at_price: { type: "number", description: "Compare at price" },
          per_delivery_price: {
            type: "number",
            description: "Price per delivery",
          },
          price: { type: "number", description: "Allocated price" },
          price_adjustments: {
            type: "array<selling_plan_allocation_price_adjustment>",
            description: "Price adjustments",
          },
          remaining_balance_charge_amount: {
            type: "number",
            description: "Remaining balance",
          },
          selling_plan: {
            type: "selling_plan",
            description: "Associated selling plan",
          },
          selling_plan_group_id: { type: "string", description: "Group ID" },
          unit_price: { type: "number", description: "Unit price" },
        },
      },

      selling_plan_allocation_price_adjustment: {
        type: "SellingPlanAllocationPriceAdjustment",
        description: "Resulting price from selling plan price adjustment.",
        properties: {
          position: { type: "number", description: "Adjustment position" },
          price: { type: "number", description: "Adjusted price" },
        },
      },

      selling_plan_checkout_charge: {
        type: "SellingPlanCheckoutCharge",
        description: "How selling plan affects checkout amount.",
        properties: {
          value: { type: "number", description: "Charge value" },
          value_type: { type: "string", description: "Value type" },
        },
      },

      selling_plan_group: {
        type: "SellingPlanGroup",
        description: "Group of selling plans for product variants.",
        properties: {
          app_id: { type: "string", description: "App ID" },
          id: { type: "number", description: "Group ID" },
          name: { type: "string", description: "Group name" },
          options: {
            type: "array<selling_plan_group_option>",
            description: "Group options",
          },
          selling_plan_selected: {
            type: "boolean",
            description: "Whether plan selected",
          },
          selling_plans: {
            type: "array<selling_plan>",
            description: "Selling plans",
          },
        },
      },

      selling_plan_group_option: {
        type: "SellingPlanGroupOption",
        description: "Option in selling plan group.",
        properties: {
          name: { type: "string", description: "Option name" },
          position: { type: "number", description: "Option position" },
          selected_value: { type: "string", description: "Selected value" },
          values: { type: "array<string>", description: "Available values" },
        },
      },

      selling_plan_option: {
        type: "SellingPlanOption",
        description: "Selling plan's value for group option.",
        properties: {
          name: { type: "string", description: "Option name" },
          position: { type: "number", description: "Option position" },
          value: { type: "string", description: "Option value" },
        },
      },

      selling_plan_price_adjustment: {
        type: "SellingPlanPriceAdjustment",
        description: "How selling plan changes variant price over time.",
        properties: {
          order_count: { type: "number", description: "Order count" },
          position: { type: "number", description: "Adjustment position" },
          value: { type: "number", description: "Adjustment value" },
          value_type: { type: "string", description: "Value type" },
        },
      },

      settings: {
        type: "Settings",
        description: "Access all theme settings from settings_schema.json.",
        properties: {},
      },

      shipping_method: {
        type: "ShippingMethod",
        description: "Shipping method information for order.",
        properties: {
          discount_allocations: {
            type: "array<discount_allocation>",
            description: "Shipping discounts",
          },
          handle: { type: "string", description: "Method handle" },
          id: { type: "string", description: "Method ID" },
          original_price: { type: "number", description: "Original price" },
          price_with_discounts: {
            type: "number",
            description: "Price after discounts",
          },
          tax_lines: {
            type: "array<tax_line>",
            description: "Tax information",
          },
          title: { type: "string", description: "Method title" },
        },
      },

      shop: {
        type: "Shop",
        description: "Information about the store.",
        properties: {
          accepts_gift_cards: {
            type: "boolean",
            description: "Whether accepts gift cards",
          },
          address: { type: "address", description: "Store address" },
          brand: { type: "brand", description: "Store brand" },
          collections_count: {
            type: "number",
            description: "Number of collections",
          },
          currency: { type: "string", description: "Store currency" },
          customer_accounts_enabled: {
            type: "boolean",
            description: "Whether customer accounts enabled",
          },
          customer_accounts_optional: {
            type: "boolean",
            description: "Whether accounts optional",
          },
          description: { type: "string", description: "Store description" },
          domain: { type: "string", description: "Store domain" },
          email: { type: "string", description: "Store email" },
          enabled_currencies: {
            type: "array<currency>",
            description: "Enabled currencies",
          },
          enabled_payment_types: {
            type: "array<string>",
            description: "Enabled payment types",
          },
          id: { type: "string", description: "Store ID" },
          metafields: { type: "metafields", description: "Store metafields" },
          money_format: { type: "currency", description: "Money format" },
          money_with_currency_format: {
            type: "currency",
            description: "Money with currency format",
          },
          name: { type: "string", description: "Store name" },
          password_message: {
            type: "string",
            description: "Password page message",
          },
          permanent_domain: { type: "string", description: "Permanent domain" },
          phone: { type: "string", description: "Store phone" },
          policies: { type: "array<policy>", description: "Store policies" },
          privacy_policy: { type: "policy", description: "Privacy policy" },
          products_count: { type: "number", description: "Number of products" },
          published_locales: {
            type: "array<shop_locale>",
            description: "Published locales",
          },
          refund_policy: { type: "policy", description: "Refund policy" },
          secure_url: { type: "string", description: "Secure URL" },
          shipping_policy: { type: "policy", description: "Shipping policy" },
          subscription_policy: {
            type: "policy",
            description: "Subscription policy",
          },
          terms_of_service: { type: "policy", description: "Terms of service" },
          types: { type: "array<string>", description: "Product types" },
          url: { type: "string", description: "Store URL" },
          vendors: { type: "array<string>", description: "Product vendors" },
        },
      },

      shop_locale: {
        type: "ShopLocale",
        description: "A language in store.",
        properties: {
          endonym_name: { type: "string", description: "Native language name" },
          iso_code: { type: "string", description: "ISO language code" },
          name: { type: "string", description: "Language name" },
          primary: { type: "boolean", description: "Whether primary language" },
          root_url: { type: "string", description: "Root URL for language" },
        },
      },

      sitemap: {
        type: "Sitemap",
        description: "Sitemap for robots.txt group.",
        properties: {
          directive: { type: "string", description: "Sitemap directive" },
          value: { type: "string", description: "Sitemap URL" },
        },
      },

      sort_option: {
        type: "SortOption",
        description: "Sort option for collection or search.",
        properties: {
          name: { type: "string", description: "Option name" },
          value: { type: "string", description: "Option value" },
        },
      },

      store_availability: {
        type: "StoreAvailability",
        description: "Variant inventory for physical store location.",
        properties: {
          available: { type: "boolean", description: "Whether available" },
          location: { type: "location", description: "Store location" },
          pick_up_enabled: {
            type: "boolean",
            description: "Whether pickup enabled",
          },
          pick_up_time: { type: "string", description: "Pickup time" },
        },
      },

      store_credit_account: {
        type: "StoreCreditAccount",
        description: "Store credit account owned by customer.",
        properties: {
          balance: { type: "money", description: "Account balance" },
        },
      },

      swatch: {
        type: "Swatch",
        description: "Color and image for visual representation.",
        properties: {
          color: { type: "color", description: "Swatch color" },
          image: { type: "image", description: "Swatch image" },
        },
      },

      tablerowloop: {
        type: "TableRowLoop",
        description: "Information about parent tablerow loop.",
        properties: {
          col: { type: "number", description: "Current column (1-based)" },
          col0: { type: "number", description: "Current column (0-based)" },
          col_first: { type: "boolean", description: "Whether first column" },
          col_last: { type: "boolean", description: "Whether last column" },
          first: { type: "boolean", description: "Whether first row" },
          index: { type: "number", description: "Current iteration (1-based)" },
          index0: {
            type: "number",
            description: "Current iteration (0-based)",
          },
          last: { type: "boolean", description: "Whether last row" },
          length: { type: "number", description: "Total iterations" },
          rindex: { type: "number", description: "Reverse index (1-based)" },
          rindex0: { type: "number", description: "Reverse index (0-based)" },
          row: { type: "number", description: "Current row" },
        },
      },

      tax_line: {
        type: "TaxLine",
        description: "Tax line information for checkout or order.",
        properties: {
          price: { type: "number", description: "Tax amount" },
          rate: { type: "number", description: "Tax rate (decimal)" },
          rate_percentage: {
            type: "number",
            description: "Tax rate percentage",
          },
          title: { type: "string", description: "Tax name" },
        },
      },

      taxonomy_category: {
        type: "TaxonomyCategory",
        description: "Taxonomy category for product.",
        properties: {
          ancestors: {
            type: "array<taxonomy_category>",
            description: "Category ancestors",
          },
          gid: { type: "string", description: "Global ID" },
          id: { type: "string", description: "Category ID" },
          name: { type: "string", description: "Category name" },
        },
      },

      template: {
        type: "Template",
        description: "Information about current template.",
        properties: {
          directory: { type: "string", description: "Template directory" },
          name: { type: "string", description: "Template name" },
          suffix: { type: "string", description: "Template suffix" },
        },
      },

      theme: {
        type: "Theme",
        description:
          "Information about current theme. Deprecated because values are subject to change.",
        deprecated: true,
        properties: {
          id: { type: "number", description: "Theme ID" },
          name: { type: "string", description: "Theme name" },
          role: { type: "string", description: "Theme role" },
        },
      },

      transaction: {
        type: "Transaction",
        description: "Transaction associated with checkout or order.",
        properties: {
          amount: { type: "number", description: "Transaction amount" },
          buyer_pending_payment_instructions: {
            type: "array<pending_payment_instruction_input>",
            description: "Payment instructions",
          },
          buyer_pending_payment_notice: {
            type: "string",
            description: "Payment notice",
          },
          created_at: { type: "string", description: "Creation timestamp" },
          gateway: { type: "string", description: "Payment gateway" },
          gateway_display_name: {
            type: "string",
            description: "Gateway display name",
          },
          id: { type: "number", description: "Transaction ID" },
          kind: { type: "string", description: "Transaction kind" },
          name: { type: "string", description: "Transaction name" },
          payment_details: {
            type: "transaction_payment_details",
            description: "Payment details",
          },
          receipt: { type: "string", description: "Receipt information" },
          show_buyer_pending_payment_instructions: {
            type: "boolean",
            description: "Whether to show instructions",
          },
          status: { type: "string", description: "Transaction status" },
          status_label: { type: "string", description: "Status label" },
        },
      },

      transaction_payment_details: {
        type: "TransactionPaymentDetails",
        description: "Payment method information for transaction.",
        properties: {
          credit_card_company: {
            type: "string",
            description: "Credit card company",
          },
          credit_card_last_four_digits: {
            type: "string",
            description: "Last 4 digits",
          },
          credit_card_number: {
            type: "string",
            description: "Masked card number",
          },
          gift_card: {
            type: "gift_card",
            description: "Gift card information",
          },
        },
      },

      unit_price_measurement: {
        type: "UnitPriceMeasurement",
        description: "How product variant units are measured for unit pricing.",
        properties: {
          measured_type: {
            type: "string",
            description: "What is being measured",
          },
          quantity_unit: { type: "string", description: "Quantity unit" },
          quantity_value: { type: "number", description: "Quantity value" },
          reference_unit: { type: "string", description: "Reference unit" },
          reference_value: { type: "number", description: "Reference value" },
        },
      },

      user: {
        type: "User",
        description: "Author of blog article.",
        properties: {
          account_owner: {
            type: "boolean",
            description: "Whether account owner",
          },
          bio: { type: "string", description: "User bio" },
          email: { type: "string", description: "User email" },
          first_name: { type: "string", description: "First name" },
          homepage: { type: "string", description: "Homepage URL" },
          image: { type: "image", description: "User image" },
          last_name: { type: "string", description: "Last name" },
          name: { type: "string", description: "Full name" },
        },
      },

      user_agent: {
        type: "UserAgent",
        description: "User agent for robots.txt group.",
        properties: {
          directive: { type: "string", description: "User-agent directive" },
          value: { type: "string", description: "User agent value" },
        },
      },

      variant: {
        type: "Variant",
        description: "A product variant.",
        properties: {
          available: {
            type: "boolean",
            description: "Whether variant is available",
          },
          barcode: { type: "string", description: "Variant barcode" },
          compare_at_price: { type: "number", description: "Compare at price" },
          featured_image: { type: "image", description: "Featured image" },
          featured_media: { type: "media", description: "Featured media" },
          id: { type: "number", description: "Variant ID" },
          image: { type: "image", description: "Variant image" },
          incoming: {
            type: "boolean",
            description: "Whether inventory is incoming",
          },
          inventory_management: {
            type: "string",
            description: "Inventory management",
          },
          inventory_policy: { type: "string", description: "Inventory policy" },
          inventory_quantity: {
            type: "number",
            description: "Available quantity",
          },
          matched: {
            type: "boolean",
            description: "Whether variant matches current selection",
          },
          metafields: {
            type: "metafields",
            description: "Associated metafields",
          },
          next_incoming_date: {
            type: "string",
            description: "Next incoming inventory date",
          },
          options: {
            type: "product_option_value",
            description: "Variant options",
          },
          price: { type: "number", description: "Variant price" },
          product: { type: "product", description: "Parent product" },
          quantity_price_breaks: {
            type: "array<quantity_price_break>",
            description: "Quantity price breaks",
          },
          quantity_price_breaks_configured: {
            type: "boolean",
            description: "Whether quantity breaks configured",
          },
          quantity_rule: {
            type: "quantity_rule",
            description: "Quantity rule",
          },
          requires_selling_plan: {
            type: "boolean",
            description: "Whether requires selling plan",
          },
          requires_shipping: {
            type: "boolean",
            description: "Whether requires shipping",
          },
          selected: {
            type: "boolean",
            description: "Whether variant is selected",
          },
          selected_selling_plan_allocation: {
            type: "selling_plan_allocation",
            description: "Selected selling plan",
          },
          selling_plan_allocations: {
            type: "array<selling_plan_allocation>",
            description: "Selling plan allocations",
          },
          sku: { type: "string", description: "SKU" },
          store_availabilities: {
            type: "array<store_availability>",
            description: "Store availability",
          },
          taxable: { type: "boolean", description: "Whether taxable" },
          title: { type: "string", description: "Variant title" },
          unit_price: { type: "number", description: "Unit price" },
          unit_price_measurement: {
            type: "unit_price_measurement",
            description: "Unit measurement",
          },
          url: { type: "string", description: "Variant URL" },
          weight: { type: "number", description: "Weight" },
          weight_in_unit: {
            type: "number",
            description: "Weight in specified unit",
          },
          weight_unit: { type: "string", description: "Weight unit" },
        },
      },

      video: {
        type: "Video",
        description: "Video uploaded as product media or metafield.",
        properties: {
          alt: { type: "string", description: "Alt text" },
          aspect_ratio: { type: "number", description: "Video aspect ratio" },
          duration: { type: "number", description: "Video duration" },
          id: { type: "number", description: "Video ID" },
          media_type: { type: "string", description: "Media type" },
          position: { type: "number", description: "Position in array" },
          preview_image: { type: "image", description: "Preview image" },
          sources: {
            type: "array<video_source>",
            description: "Video sources",
          },
        },
      },

      video_source: {
        type: "VideoSource",
        description: "Source files for video.",
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
