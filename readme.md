# Shopify Liquid Inspector

A lightweight VS Code extension that gives you **instant hover documentation** and validation for Shopify Liquid templates.

## ✨ What it does

• Hover over **objects** (`product`, `collection`, …) to see their properties and types.

• Hover over **filters** and **tags** to view syntax, parameters and examples.

• Warns you about **invalid or deprecated** properties, filters and tags.

• Works perfectly with the official _Shopify Liquid_ extension – keep it installed for syntax highlighting, add Liquid Inspector for deep insight.

## 🚀 How to use

1. Install the extension from the VS Code Marketplace.
2. Open a `.liquid` file.
3. Hover over any Liquid identifier:

   ```liquid
   {{ product.price | money }}         <!-- filter docs -->
   {% for product in collection.products %}  <!-- tag docs -->
     {{ product.title }}               <!-- object docs -->
   {% endfor %}
   ```

4. (Optional) Tweak settings in _Preferences › Settings › Extensions › Liquid Inspector_.

## ⚙️ Key settings

| Setting                                  | Purpose                      | Default |
| ---------------------------------------- | ---------------------------- | ------- |
| `liquidInspector.enabled`                | Enable/disable the extension | `true`  |
| `liquidInspector.showTypes`              | Show types in hovers         | `true`  |
| `liquidInspector.showDescription`        | Show descriptions in hovers  | `true`  |
| `liquidInspector.showDeprecatedWarnings` | Highlight deprecated items   | `true`  |
| `liquidInspector.enableFilterHover`      | Enable filter hover docs     | `true`  |
| `liquidInspector.enableTagHover`         | Enable tag hover docs        | `true`  |

> Tip: Set `liquidInspector.maxPropertiesInHover` if you only want to see a few properties.

## 📄 License

[MIT](LICENSE.txt)

---

Made with ❤️ for Shopify theme developers
