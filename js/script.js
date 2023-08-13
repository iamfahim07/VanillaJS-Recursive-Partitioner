const colorNames = [
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkgrey",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "greenyellow",
  "grey",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightgrey",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "slategrey",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen",
];

const colorUsed = ["teal"];

let id = 1;

const child = (firstDivId, secondDivId, firstDivColor, secondDivColor) => {
  return `
    <div id=${firstDivId} style="${firstDivColor}" class="boxStyle">
          <button onclick="handleVerticalClick(event)">v</button>
          <button onclick="handleHorizontalClick(event)">h</button>
          <button onclick="handleRemoveClick(event)"> - </button>
        </div>
    
        <div id=${secondDivId} style="background-color: ${secondDivColor}" class="boxStyle">
          <button onclick="handleVerticalClick(event)">v</button>
          <button onclick="handleHorizontalClick(event)">h</button>
          <button onclick="handleRemoveClick(event)"> - </button>
        </div>
    `;
};

const removeChild = `
            <button onclick="handleVerticalClick(event)">v</button>
            <button onclick="handleHorizontalClick(event)">h</button>
            <button onclick="handleRemoveClick(event)"> - </button>          
      `;

function handleVerticalClick(event) {
  const parent = event.target.parentElement;
  let parentColor = parent.getAttribute("style");
  parent.removeAttribute("style");
  parent.classList.remove("boxStyle");
  parent.classList.add("vertical");
  let firstDivId = id + 1;
  let secondDivId = id + 2;
  let firstDivColor = parentColor;
  let secondDivColor = pickColorIfAvailable(pickColor);
  parent.innerHTML = child(
    firstDivId,
    secondDivId,
    firstDivColor,
    secondDivColor
  );
  id += 2;
}

function handleHorizontalClick(event) {
  const parent = event.target.parentElement;
  let parentColor = parent.getAttribute("style");
  parent.removeAttribute("style");
  parent.classList.remove("boxStyle");
  parent.classList.add("horizontal");
  let firstDivId = id + 1;
  let secondDivId = id + 2;
  let firstDivColor = parentColor;
  let secondDivColor = pickColorIfAvailable(pickColor);
  parent.innerHTML = child(
    firstDivId,
    secondDivId,
    firstDivColor,
    secondDivColor
  );
  id += 2;
}

function pickColor() {
  const pickedColorIndex = Math.floor(Math.random() * colorNames.length);
  return colorNames[pickedColorIndex];
}

function pickColorIfAvailable(fn) {
  const generateColor = fn();
  const isAvailable = colorUsed.includes(generateColor);

  if (isAvailable) {
    return pickColorIfAvailable(fn);
  } else {
    colorUsed.push(generateColor);
    return generateColor;
  }
}

function handleRemoveClick(event) {
  const greatGrandParent =
    event.target.parentElement.parentElement.parentElement;

  const grandParent = event.target.parentElement.parentElement;

  const grandParentPreviousSibling =
    event.target.parentElement.parentElement.previousElementSibling;

  const grandParentNextSibling =
    event.target.parentElement.parentElement.nextElementSibling;

  const parent = event.target.parentElement;

  const previousSibling = event.target.parentElement.previousElementSibling;

  const nextSibling = event.target.parentElement.nextElementSibling;

  // remove the remove button
  if (greatGrandParent.tagName === "BODY") {
    if (
      previousSibling !== null &&
      previousSibling.parentElement.parentElement.tagName === "BODY" &&
      greatGrandParent.tagName === "BODY" &&
      previousSibling.lastElementChild.tagName === "BUTTON"
    ) {
      previousSibling.lastElementChild.remove();
    }

    if (
      nextSibling !== null &&
      nextSibling.parentElement.parentElement.tagName === "BODY" &&
      greatGrandParent.tagName === "BODY" &&
      nextSibling.lastElementChild.tagName === "BUTTON"
    ) {
      nextSibling.lastElementChild.remove();
    }
  }

  // previous sibling
  if (previousSibling !== null) {
    parent.remove();
    grandParent.remove();
    if (grandParentPreviousSibling !== null) {
      greatGrandParent.appendChild(grandParentPreviousSibling);
      greatGrandParent.appendChild(previousSibling);
    }

    if (grandParentNextSibling !== null) {
      greatGrandParent.appendChild(previousSibling);
      greatGrandParent.appendChild(grandParentNextSibling);
    }
  }

  // next sibling
  if (nextSibling !== null) {
    parent.remove();
    grandParent.remove();
    if (grandParentPreviousSibling !== null) {
      greatGrandParent.appendChild(grandParentPreviousSibling);
      greatGrandParent.appendChild(nextSibling);
    }

    if (grandParentNextSibling !== null) {
      greatGrandParent.appendChild(nextSibling);
      greatGrandParent.appendChild(grandParentNextSibling);
    }
  }
}
