const output = document.getElementById("output");

// Generate one promise with random delay 1–3 seconds
function makePromise(name) {
  const delay = (Math.random() * 2 + 1); // 1 to 3 seconds

  return new Promise((resolve,rej) => {
    setTimeout(() => {
      resolve({ name, time: delay });
    }, delay * 1000);
  });
}

// Create three promises
const p1 = makePromise("Promise 1");
const p2 = makePromise("Promise 2");
const p3 = makePromise("Promise 3");

// Wait for all promises to finish
Promise.all([p1, p2, p3]).then((results) => {
  
  // Remove "Loading..." row
  output.innerHTML = "";

  // Add rows for each promise
  results.forEach((p) => {
    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.innerText = p.name;

    const timeTd = document.createElement("td");
    timeTd.innerText = p.time.toFixed(3);

    tr.appendChild(nameTd);
    tr.appendChild(timeTd);
    output.appendChild(tr);
  });

  // Total time = the longest time
  const totalTime = Math.max(...results.map(r => r.time));

  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
        <td>Total</td>
        <td>${totalTime.toFixed(3)}</td>
    `;
  output.appendChild(totalRow);
});
