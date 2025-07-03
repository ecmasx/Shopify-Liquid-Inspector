# Shopify Liquid Inspector

A powerful VS Code extension for inspecting Shopify Liquid templates with comprehensive hover information, property validation, autocomplete support, and **complete filter documentation**.

## ✨ Key Features

### 🔍 **Object & Property Inspection**

- **Detailed hover information** for Shopify objects (`product`, `collection`, `customer`, etc.)
- **Property validation** with warnings for invalid properties
- **Nested property support** with full path resolution
- **Type information** and descriptions for all properties

### 🎛️ **Filter Documentation & Help**

- **Complete filter library** with 100+ Shopify filters documented
- **Parameter information** with types and descriptions
- **Usage examples** for each filter
- **Deprecation warnings** for outdated filters
- **Category organization** (Array, String, Money, Date, Color, etc.)

### ⚠️ **Smart Validation**

- **Property existence checking**
- **Deprecated object detection**
- **Invalid property highlighting**
- **Context-aware suggestions**

## 🚀 Getting Started

### Basic Usage

1. **Open any Liquid template** (`.liquid` file)
2. **Hover over objects** to see detailed information:

   ```liquid
   {{ product.title }}
   <!-- Hover over 'product' or 'title' for info -->
   ```

3. **Hover over filters** to see documentation:

   ```liquid
   {{ product.price | money }}
   <!-- Hover over 'money' filter for complete documentation -->
   ```

4. **Get property suggestions** while typing:

   ```liquid
   {{ customer. }}
   <!-- See all available customer properties -->
   ```

### Advanced Features

**Object Property Validation**

```liquid
{{ product.invalid_property }}
<!-- ⚠️ Warning: Property doesn't exist -->
```

**Filter Documentation**

```liquid
{{ collection.products | where: 'available', true | sort: 'title' }}
<!-- Hover over 'where' or 'sort' for full documentation, parameters, and examples -->
```

**Deprecated Detection**

```liquid
{{ script.name }}
<!-- ⚠️ Deprecated: Use Shopify Functions instead -->

{{ product.image | img_url: 'master' }}
<!-- ⚠️ Deprecated filter: Use image_url instead -->
```

## ⚙️ Configuration

Customize the extension through VS Code settings:

```json
{
  "liquidInspector.enabled": true,
  "liquidInspector.showTypes": true,
  "liquidInspector.showDescription": true,
  "liquidInspector.showDeprecatedWarnings": true,
  "liquidInspector.maxPropertiesInHover": 25,
  "liquidInspector.enablePropertyValidation": true,
  "liquidInspector.highlightInvalidProperties": true,
  "liquidInspector.enableFilterHover": true,
  "liquidInspector.showFilterExamples": true,
  "liquidInspector.showFilterParameters": true
}
```

### Settings Reference

| Setting                                      | Description                               | Default |
| -------------------------------------------- | ----------------------------------------- | ------- |
| `liquidInspector.enabled`                    | Enable/disable the extension              | `true`  |
| `liquidInspector.showTypes`                  | Show type information in tooltips         | `true`  |
| `liquidInspector.showDescription`            | Show descriptions in tooltips             | `true`  |
| `liquidInspector.showDeprecatedWarnings`     | Warn about deprecated objects and filters | `true`  |
| `liquidInspector.maxPropertiesInHover`       | Max properties in hover (5-100)           | `25`    |
| `liquidInspector.enablePropertyValidation`   | Validate property existence               | `true`  |
| `liquidInspector.highlightInvalidProperties` | Highlight invalid properties              | `true`  |
| `liquidInspector.enableFilterHover`          | Enable hover information for filters      | `true`  |
| `liquidInspector.showFilterExamples`         | Show examples in filter tooltips          | `true`  |
| `liquidInspector.showFilterParameters`       | Show parameter info for filters           | `true`  |

## 🤝 Works with Official Shopify Liquid Extension

This extension is designed to **complement** the official [Shopify Liquid](https://marketplace.visualstudio.com/items?itemName=Shopify.theme-check-vscode) extension:

### Perfect Integration

- **Enhanced IntelliSense**: Adds detailed hover information to Shopify Liquid's syntax highlighting
- **Filter Documentation**: Complete filter reference with examples and parameters
- **Property Validation**: Works alongside Theme Check for comprehensive validation
- **No Conflicts**: Both extensions work together seamlessly
- **Complementary Features**:
  - Official extension provides syntax highlighting and basic validation
  - Liquid Inspector adds deep object inspection, filter documentation, and property details

### Enhanced Workflow

```liquid
<!-- Official extension provides syntax highlighting -->
{{ product.title | money | default: 'Free' }}
     ↑               ↑           ↑
<!-- Liquid Inspector provides detailed hover info for objects, filters, and their parameters -->
```

Both extensions complement each other to provide a complete Shopify Liquid development environment.

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- **Shopify** for the comprehensive Liquid documentation and filter reference
- **VS Code team** for the excellent extension API
- **Official Shopify Liquid Extension** for providing the foundation

---

**Made with ❤️ for Shopify theme developers**
