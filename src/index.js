(function() {
  const trim = s => s.replace(/^\s+/, '').replace(/\s+$/, '');
  const removeDiv = () => {
    const div = document.querySelector("#chase-bookmarklet");
    if (div) {
      document.body.removeChild(div);
    }
  }
  const createDiv = () => {
    removeDiv();
    const div = document.createElement("div");
    Object.assign(div.style, {
      height: '50px',
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      textAlign: 'center',
      background: 'white',
      color: 'black',
      lineHeight: '50px',
      size: '15px',
      zIndex: 2147483640
    });
    div.id = 'chase-bookmarklet';
    div.innerHTML = 'Click on the table to convert'
    document.body.appendChild(div);
  }
  const removeModal = () => {
    const div = document.querySelector("#chase-bookmarklet-modal");
    if (div) {
      document.body.removeChild(div);
    }
  }
  const createModal = transactions => {
    removeModal();
    const ta = document.createElement("textarea");
    const value = transactions.map(({ date, desc, type, amount }) => {
      return `${trim(date)} ${trim(desc)} ${trim(type)} ${trim(amount)}`;
    }).join("\n")
    ta.value = value;
    Object.assign(ta.style, {
      width: "80%"
    });
    const btn = document.createElement("button");
    btn.innerHTML = "close";
    btn.addEventListener("click", e => {
      e.preventDefault();
      removeModal();
    });
    Object.assign(btn.style, {
      width: "20%"
    });

    const div = document.createElement("div");
    Object.assign(div.style, {
      height: '80%',
      width: '80%',
      position: 'fixed',
      top: '10%',
      left: '10%',
      textAlign: 'left',
      background: 'white',
      color: 'black',
      lineHeight: '50px',
      size: '15px',
      display: 'flex',
      zIndex: 2147483647
    });
    div.id = 'chase-bookmarklet-modal';
    div.appendChild(ta);
    div.appendChild(btn);
    document.body.appendChild(div);
  }
  
  const getTransactionsFromTable = table => {
    const transactions = [];
    Array.from(table.querySelectorAll("tr")).forEach(tr => {
      const tds = Array.from(tr.querySelectorAll("td"));
      if (tds.length) {
        const [ dateTd, descTd, typeTd, amountTd ] = tds;
        const date = dateTd.innerText;
        const desc = descTd.querySelector('span').innerText;
        const type = typeTd.innerText;
        const amount = amountTd.innerText;
        transactions.push({ date, desc, type, amount });
      }
    })
    return transactions;
  }

  const onClick = e => {
    let table = e.target;
    while (table && table !== document.body && table.id !== "activityTable") {
      table = table.parentNode;
    }
    if (table === document.body) {
      alert("couldnt find table");
    } else {
      const transactions = getTransactionsFromTable(table);
      console.dir(transactions);
      createModal(transactions)
    }
    removeDiv();
    document.body.removeEventListener("click", onClick);
  };

  removeDiv();
  removeModal();
  createDiv();
  document.body.addEventListener("click", onClick);
})()
