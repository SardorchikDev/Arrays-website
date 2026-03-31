const methodData = [
  {
    name: "push()",
    description: "Adds a new element to the end of the array.",
    code: `let array = [1, 2, 3];
array.push(4);`,
    result: "[1, 2, 3, 4]",
  },
  {
    name: "pop()",
    description: "Removes the last element from the array.",
    code: `let array = [1, 2, 3];
array.pop();`,
    result: "[1, 2]",
  },
  {
    name: "unshift()",
    description: "Adds a new element to the beginning of the array.",
    code: `let array = [1, 2, 3];
array.unshift(1);`,
    result: "[1, 1, 2, 3]",
  },
  {
    name: "shift()",
    description: "Removes the first element from the array.",
    code: `let array = [1, 2, 3];
array.shift();`,
    result: "[2, 3]",
  },
  {
    name: "length",
    description: "Returns how many items exist inside the array.",
    code: `let array = [1, 2, 3];
console.log(array.length);`,
    result: "3",
  },
  {
    name: "split()",
    description: "Turns a string into an array using a separator.",
    code: `let text = "b,e,g,i";
console.log(text.split(","));`,
    result: `["b", "e", "g", "i"]`,
  },
  {
    name: "join()",
    description: "Turns an array into a string with a separator.",
    code: `let arr = ["amogus", "sus", "array"];
console.log(arr.join(" , "));`,
    result: `"amogus , sus , array"`,
  },
  {
    name: "Nested Arrays",
    description: "Arrays can hold other arrays and be accessed by indexes.",
    code: `let sumth = [[1, 2], [2, 3], [3, 4]];
console.log(sumth[0]);
console.log(sumth[2][0]);`,
    result: "[1, 2] and 3",
  },
  {
    name: "Dynamic Arrays",
    description: "Arrays can be edited by pushing values or replacing indexes.",
    code: `let arr = [10, 20];
arr.push(69);
arr[0] = 96;
console.log(arr);`,
    result: "[96, 20, 69]",
  },
];

const baseArray = [1, 2, 3];
let liveArray = [...baseArray];

const heroArray = document.getElementById("heroArray");
const methodCards = document.getElementById("methodCards");
const liveArrayContainer = document.getElementById("liveArray");
const arrayLog = document.getElementById("arrayLog");
const lengthValue = document.getElementById("lengthValue");
const firstValue = document.getElementById("firstValue");
const lastValue = document.getElementById("lastValue");
const nestedVisual = document.getElementById("nestedVisual");
const resetArrayButton = document.getElementById("resetArray");
const splitInput = document.getElementById("splitInput");
const splitSeparator = document.getElementById("splitSeparator");
const splitOutput = document.getElementById("splitOutput");
const joinInput = document.getElementById("joinInput");
const joinSeparator = document.getElementById("joinSeparator");
const joinOutput = document.getElementById("joinOutput");
const runSplitButton = document.getElementById("runSplit");
const runJoinButton = document.getElementById("runJoin");

function renderArray(container, array) {
  if (!array.length) {
    container.innerHTML = '<span class="empty-state">Array is empty</span>';
    return;
  }

  container.innerHTML = array
    .map((item) => `<span class="array-chip">${item}</span>`)
    .join("");
}

function renderMethodCards() {
  methodCards.innerHTML = methodData
    .map(
      (method) => `
        <article class="method-card">
          <div class="panel-tag">${method.name}</div>
          <h3>${method.name}</h3>
          <p>${method.description}</p>
          <pre class="method-code"><code>${method.code}</code></pre>
          <div class="method-result">Result: ${method.result}</div>
        </article>
      `
    )
    .join("");
}

function updateFacts() {
  lengthValue.textContent = liveArray.length;
  firstValue.textContent = liveArray[0] ?? "-";
  lastValue.textContent = liveArray[liveArray.length - 1] ?? "-";
}

function updateLiveArray(action = "Initial state") {
  renderArray(liveArrayContainer, liveArray);
  updateFacts();
  arrayLog.textContent = `// ${action}\nconst array = ${JSON.stringify(liveArray)};`;
}

function mutateArray(action) {
  if (action === "push") {
    liveArray.push(4);
    updateLiveArray("push(4)");
    return;
  }

  if (action === "pop") {
    liveArray.pop();
    updateLiveArray("pop()");
    return;
  }

  if (action === "unshift") {
    liveArray.unshift(1);
    updateLiveArray("unshift(1)");
    return;
  }

  if (action === "shift") {
    liveArray.shift();
    updateLiveArray("shift()");
  }
}

function renderNestedArrays() {
  const nested = [
    [1, 2],
    [2, 3],
    [3, 4],
  ];

  nestedVisual.innerHTML = nested
    .map(
      (group, index) => `
        <div class="nested-box">
          <strong>sumth[${index}]</strong>
          <span>[${group.join(", ")}]</span>
        </div>
      `
    )
    .join("");
}

function runSplit() {
  const result = splitInput.value.split(splitSeparator.value);
  splitOutput.textContent = `const text = "${splitInput.value}";\ntext.split("${splitSeparator.value}")\n// ${JSON.stringify(result)}`;
}

function runJoin() {
  const items = joinInput.value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const result = items.join(joinSeparator.value);
  joinOutput.textContent = `const arr = ${JSON.stringify(items)};\narr.join("${joinSeparator.value}")\n// "${result}"`;
}

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => mutateArray(button.dataset.action));
});

resetArrayButton.addEventListener("click", () => {
  liveArray = [...baseArray];
  updateLiveArray("reset()");
});

runSplitButton.addEventListener("click", runSplit);
runJoinButton.addEventListener("click", runJoin);
splitInput.addEventListener("input", runSplit);
splitSeparator.addEventListener("input", runSplit);
joinInput.addEventListener("input", runJoin);
joinSeparator.addEventListener("input", runJoin);

renderArray(heroArray, baseArray);
renderMethodCards();
renderNestedArrays();
updateLiveArray();
runSplit();
runJoin();
