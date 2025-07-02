# Shopify Liquid Inspector

A VS Code extension for inspecting Shopify Liquid templates with hover information and property validation.

## Features

### 🔍 Hover Information

Get detailed information about Shopify objects and their properties when you hover over them in Liquid templates:

- Object descriptions and types
- Available properties

## Supported Objects

The extension provides hover information for all **132 official Shopify Liquid objects**:

### Core Objects

- `shop` - Store information and settings
- `product` - Product information, variants, images, etc.
- `variant` - Product variants
- `cart` - Shopping cart details and items
- `customer` - Customer information and addresses
- `collection` - Product collections
- `order` - Order information
- `item` / `line_item` - Cart and order line items

### Content Objects

- `page` - Store pages
- `article` - Blog articles
- `blog` - Blog information
- `comment` - Blog comments
- `image` - Image objects
- `video` - Video objects
- `media` - Media objects
- `external_video` - External video sources

### Navigation & Structure

- `section` - Theme sections
- `block` - Section blocks
- `template` - Current template
- `link` - Navigation links
- `linklist` / `linklists` - Navigation menus
- `routes` - Store routes

### Customer & Commerce

- `address` - Customer addresses
- `discount` - Discount objects
- `gift_card` - Gift card information
- `fulfillment` - Order fulfillments
- `transaction` - Payment transactions
- `shipping_method` - Shipping methods
- `tax_line` - Tax information

### Forms & Interaction

- `form` - Form objects
- `form_errors` - Form validation errors
- `search` - Search functionality
- `predictive_search` - Predictive search results
- `filter` - Collection filters
- `filter_value` - Filter values
- `sort_option` - Sorting options

### Meta & Configuration

- `settings` - Theme settings
- `metafield` - Metafield data
- `metaobject` - Metaobjects
- `localization` - Localization settings
- `language` - Language objects
- `country` - Country objects
- `currency` - Currency objects

### Loop Objects

- `forloop` - For loop variables
- `tablerow` / `tablerowloop` - Table row loops
- `paginate` - Pagination

### Checkout & Payments

- `checkout` - Checkout process
- `customer_payment_method` - Payment methods
- `pending_payment_instruction_input` - Payment instructions
- `discount_allocation` - Discount allocations
- `discount_application` - Applied discounts

### Advanced Commerce

- `selling_plan` - Subscription plans
- `selling_plan_group` - Plan groups
- `selling_plan_allocation` - Plan allocations
- `store_availability` - Store pickup availability
- `company` - B2B companies
- `location` - Store locations

### Content Management

- `articles` - Article collections
- `pages` - Page collections
- `blogs` - Blog collections
- `collections` - Collection arrays
- `all_products` - All products

### Theme & Design

- `brand` - Brand information
- `color` - Color objects
- `color_scheme` - Color schemes
- `font` - Font objects
- `swatch` - Color swatches
- `focal_point` - Image focal points

### Technical Objects

- `request` - Request information
- `app` / `apps` - App objects
- `script` / `scripts` - Script tags
- `user_agent` - Browser information
- `handle` - Current handle
- `canonical_url` - Canonical URLs
- `robots` - SEO robots
- `sitemap` - Sitemap data

### Specialized Objects

- `taxonomy_category` - Product taxonomy
- `measurement` - Unit measurements
- `rating` - Product ratings
- `recipient` - Gift card recipients
- `money` - Money formatting
- `generic_file` - File objects
- `powered_by_link` - Shopify branding

And many more specialized objects for advanced Shopify features, B2B functionality, and theme customization.

## Usage

1. Open any Liquid template file
2. Hover over Shopify object properties to see detailed information
3. Invalid properties will be highlighted with warning squiggles
4. View available properties in the hover tooltip

## Configuration

You can configure the extension through VS Code settings:

```json
{
  "liquidInspector.enabled": true,
  "liquidInspector.showTypes": true,
  "liquidInspector.showDescription": true,
  "liquidInspector.maxPropertiesInHover": 25
}
```

### Settings

- `liquidInspector.enabled` - Enable/disable the extension
- `liquidInspector.showTypes` - Show type information in hover tooltips
- `liquidInspector.showDescription` - Show descriptions in hover tooltips
- `liquidInspector.maxPropertiesInHover` - Maximum number of properties to show in hover tooltip (5-100, default: 25)

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.
