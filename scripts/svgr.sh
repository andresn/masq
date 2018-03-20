# Convert all svgs in src/icons to react components
svgr --replace-attr-value "#000=currentColor" -d src/icons/ src/icons/
