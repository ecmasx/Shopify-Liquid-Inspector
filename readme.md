# Shopify Liquid Inspector

A powerful VS Code extension for inspecting Shopify Liquid templates with comprehensive hover information, property validation, and autocomplete support.

## Features

### 🔍 Intelligent Hover Information

Get detailed information about Shopify objects and their properties when you hover over them in Liquid templates:

- **Object descriptions** with complete context
- **Property types** and descriptions
- **Available properties** with real-time suggestions
- **Deprecated warnings** for outdated objects and properties

### ✨ Smart Property Validation

- **Real-time validation** of object properties
- **Warning highlights** for invalid or non-existent properties
- **Type checking** for property usage
- **Deprecated object detection** with migration suggestions

### 🚀 Enhanced Developer Experience

- **IntelliSense support** for all Shopify objects
- **Property autocomplete** with fuzzy matching
- **Context-aware suggestions** based on template type
- **Documentation links** for complex objects

## Complete Object Coverage

The extension provides comprehensive support for all **132 official Shopify Liquid objects** including:

### 📦 Core Commerce Objects

**Products & Inventory**

- `product` - Product information, variants, images, media
- `variant` - Product variants with pricing and inventory
- `collection` - Product collections and filtering
- `all_products` - Global product access (limited to 20 handles)

**Shopping & Checkout**

- `cart` - Shopping cart with items and totals
- `line_item` - Cart and order line items
- `checkout` - Checkout process and payment
- `order` - Order details and fulfillment

**Customer Management**

- `customer` - Customer profiles and preferences
- `address` - Customer and shipping addresses
- `customer_payment_method` - Saved payment methods
- `company` / `company_address` / `company_location` - B2B customer data

### 🏪 Store & Configuration

**Store Information**

- `shop` - Store settings, policies, and configuration
- `brand` - Brand assets, colors, logos
- `localization` - Multi-language and currency support
- `market` - Regional market configuration

**Navigation & Structure**

- `linklists` / `linklist` / `link` - Navigation menus
- `routes` - Standard store URLs
- `request` - Current request information
- `canonical_url` - SEO canonical URLs

### 📝 Content Management

**Pages & Content**

- `page` / `pages` - Store pages and content
- `blog` / `blogs` / `article` / `articles` - Blog content
- `comment` - Blog article comments
- `search` / `predictive_search` - Search functionality

**Media & Assets**

- `image` / `images` - Image objects with focal points
- `video` / `video_source` - Video content
- `external_video` - YouTube/Vimeo videos
- `media` - Unified media objects
- `model` / `model_source` - 3D models

### 🎨 Theme & Design

**Visual Elements**

- `color` / `color_scheme` / `color_scheme_group` - Color management
- `font` - Typography and font loading
- `swatch` - Color and image swatches
- `focal_point` - Image cropping points
- `image_presentation` - Image display settings

**Theme Structure**

- `section` / `block` - Theme sections and blocks
- `template` - Current template information
- `settings` - Theme settings and configuration
- `app` - Theme app extensions

### 💰 Commerce Features

**Pricing & Discounts**

- `money` - Money formatting and currency
- `discount` / `discount_allocation` / `discount_application` - Discounts
- `quantity_price_break` / `quantity_rule` - Bulk pricing
- `tax_line` - Tax calculations

**Subscriptions & Plans**

- `selling_plan` / `selling_plan_group` - Subscription plans
- `selling_plan_allocation` - Plan pricing
- `selling_plan_option` - Plan customization

**Fulfillment & Shipping**

- `fulfillment` - Order fulfillment tracking
- `shipping_method` - Shipping options
- `transaction` / `transaction_payment_details` - Payments
- `store_availability` / `location` - Local pickup

### 🔧 Advanced Features

**Filtering & Search**

- `filter` / `filter_value` - Collection filtering
- `sort_option` - Sorting options
- `predictive_search_resources` - Search results

**Forms & Interaction**

- `form` / `form_errors` - Form handling
- `paginate` / `part` - Pagination controls
- `recommendations` - Product recommendations

**Loop Controls**

- `forloop` - For loop variables and state
- `tablerowloop` - Table row iteration
- `current_page` / `current_tags` - Context variables

### 📊 Data & Metadata

**Custom Data**

- `metafield` - Custom field data
- `metaobject` / `metaobject_definition` / `metaobject_system` - Custom objects
- `metaobjects` - Object collections

**Measurements & Ratings**

- `measurement` - Unit measurements
- `unit_price_measurement` - Unit pricing
- `rating` - Product ratings
- `taxonomy_category` - Product categorization

### 🌐 Localization & SEO

**Multi-region Support**

- `country` / `currency` - Regional settings
- `shop_locale` - Language configuration
- `closest` - Context-aware resource selection

**SEO & Technical**

- `robots` / `group` / `rule` / `sitemap` / `user_agent` - SEO robots.txt
- `handle` - Resource handles
- `page_title` / `page_description` / `page_image` - Meta tags

### ⚙️ System & Integration

**Gift Cards & Credits**

- `gift_card` / `recipient` - Gift card functionality
- `store_credit_account` - Store credit management

**Technical Objects**

- `content_for_header` / `content_for_layout` / `content_for_index` - Theme structure
- `additional_checkout_buttons` / `content_for_additional_checkout_buttons` - Payment buttons
- `powered_by_link` - Shopify branding

**Deprecated Objects** ⚠️

- `script` / `scripts` - Legacy Shopify Scripts (sunset August 2025)
- `theme` - Theme information (values subject to change)
- `discount` - Legacy discount object (use discount_application)
- `filter_value_display` - Legacy filter display (use swatch)

### 🌏 Country & Region

**Geographic Data**

- `all_country_option_tags` / `country_option_tags` - Country selectors
- `pending_payment_instruction_input` - Offline payment instructions
- `user` - Content author information
- `policy` - Store policies

**File Management**

- `generic_file` - Non-media file uploads

## Usage

### Basic Usage

1. **Open any Liquid template** (`.liquid` file)
2. **Hover over objects** to see detailed information:

   ```liquid
   {{ product.title }}
   <!-- Hover over 'product' or 'title' for info -->
   ```

3. **Get property suggestions** while typing:

   ```liquid
   {{ customer. }}
   <!-- See all available customer properties -->
   ```

### Advanced Features

**Property Validation**

```liquid
{{ product.invalid_property }}
<!-- ⚠️ Warning: Property doesn't exist -->
```

**Deprecated Object Detection**

```liquid
{{ script.name }}
<!-- ⚠️ Deprecated: Use Shopify Functions instead -->
```

**Context-Aware Suggestions**

```liquid
<!-- In product template, get product-specific suggestions -->
{{ product.variants.first.price }}
```

## Configuration

Customize the extension through VS Code settings:

```json
{
  "liquidInspector.enabled": true,
  "liquidInspector.showTypes": true,
  "liquidInspector.showDescription": true,
  "liquidInspector.showDeprecatedWarnings": true,
  "liquidInspector.maxPropertiesInHover": 25,
  "liquidInspector.enablePropertyValidation": true,
  "liquidInspector.highlightInvalidProperties": true
}
```

### Settings Reference

| Setting | Description | Default |
|---------|-------------|---------|
| `liquidInspector.enabled` | Enable/disable the extension | `true` |
| `liquidInspector.showTypes` | Show type information in tooltips | `true` |
| `liquidInspector.showDescription` | Show descriptions in tooltips | `true` |
| `liquidInspector.showDeprecatedWarnings` | Warn about deprecated objects | `true` |
| `liquidInspector.maxPropertiesInHover` | Max properties in hover (5-100) | `25` |
| `liquidInspector.enablePropertyValidation` | Validate property existence | `true` |
| `liquidInspector.highlightInvalidProperties` | Highlight invalid properties | `true` |

## Works with Official Shopify Liquid Extension

This extension is designed to **complement** the official [Shopify Liquid](https://marketplace.visualstudio.com/items?itemName=Shopify.theme-check-vscode) extension:

### 🤝 Perfect Integration

- **Enhanced IntelliSense**: Adds detailed hover information to Shopify Liquid's syntax highlighting
- **Property Validation**: Works alongside Theme Check for comprehensive validation
- **No Conflicts**: Both extensions work together seamlessly
- **Complementary Features**:
  - Official extension provides syntax highlighting and basic validation
  - Liquid Inspector adds deep object inspection and property details

### 📋 Recommended Setup

Install **both extensions** for the best Shopify development experience:

1. **Shopify Liquid** (Official) - Syntax highlighting, snippets, Theme Check
2. **Shopify Liquid Inspector** (This extension) - Object inspection, property validation

### ⚡ Enhanced Workflow

```liquid
<!-- Official extension provides syntax highlighting -->
{{ product.title }}
     ↑
<!-- Liquid Inspector provides detailed hover info -->
```

Both extensions complement each other to provide a complete Shopify Liquid development environment.

## Known Issues

- Large objects may take a moment to load all properties
- Some deprecated warnings may appear for legacy themes (this is intentional)

## Roadmap

- 🔄 **Autocomplete improvements** with fuzzy matching
- 🎯 **Template-specific suggestions** (product vs collection templates)
- 📚 **Inline documentation** with Shopify docs links
- 🔍 **Go to definition** for custom objects
- 🛠️ **Refactoring tools** for deprecated object migration

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgments

- **Shopify** for the comprehensive Liquid documentation
- **VS Code team** for the excellent extension API
- **Official Shopify Liquid Extension** for providing the foundation

---

**Made with ❤️ for Shopify theme developers**
