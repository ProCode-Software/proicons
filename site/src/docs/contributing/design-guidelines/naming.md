---
title: Design Guidelines
editLink: true
---
# Naming
When exporting icons, please follow these naming conventions:

1. Icons should be named in Title Case. Each word should also begin with a capital letter.
    * "**Thumbs Up**" is used instead of "Thumbs up".

2. Icons should be named by what they actually are, rather than what it's used for.
    * **Shield** is used instead of Security.

3. Icons should be named using US English variants.
    * "**Color Palette**" is used instead of "Colour Palette".

::: info Note
Names in other English variants are still acceptable in tags. You may also put both variants if you wish, which can help with [`proicons.search()`](../javascript-api#search).
:::

4. Nouns in icons should go before adjectives or modifiers.
    * "**Arrow Down**" is used instead of "Down Arrow".
    * "**Person Multiple**" is used instead of "Multiple People".

5. The only special characters or symbols (non-letter or numerical characters) allowed in icon names are hyphens (`-`) or parenthesis (`( )`).<br>
**Please avoid using any other special character**. This includes dots (`.`) (or other punctuation marks) and slashes (`/` or `\`)

6. Alternative icons, can either be numbered or named by what makes the variant unique. These names are allowed:
    * "Person 2" for Person
    * "Ruler Diagonal" for Ruler

7. Other icon names containing numbers should be spelled out.
    * "**Leaf Two**" is used instead of "Leaf 2"

8. Icon names should not begin with numbers. These names are not allowed to be used for variables in JavaScript and Lua.