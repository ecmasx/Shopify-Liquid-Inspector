# Shopify Liquid Inspector

A powerful VS Code extension for inspecting Shopify Liquid templates with comprehensive hover information, property validation, and autocomplete support.

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

### ⚡ Enhanced Workflow

```liquid
<!-- Official extension provides syntax highlighting -->
{{ product.title }}
     ↑
<!-- Liquid Inspector provides detailed hover info -->
```

Both extensions complement each other to provide a complete Shopify Liquid development environment.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgments

- **Shopify** for the comprehensive Liquid documentation
- **VS Code team** for the excellent extension API
- **Official Shopify Liquid Extension** for providing the foundation

---

**Made with ❤️ for Shopify theme developers**
