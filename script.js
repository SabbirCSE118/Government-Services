const services = [
      { name: 'জাতীয় জরুরি সেবা', subtitle: 'National Emergency Service', number: '999', category: 'সার্বজনীন', icon: './assets/emergency.png' },
      { name: 'ফায়ার সার্ভিস', subtitle: 'Fire Service', number: '999', category: 'ফায়ার', icon: './assets/fire-service.png' },
      { name: 'পুলিশ', subtitle: 'Police', number: '999', category: 'পুলিশ', icon: './assets/police.png' },
      { name: 'অ্যাম্বুলেন্স', subtitle: 'Ambulance', number: '1994-999999', category: 'স্বাস্থ্য', icon: './assets/ambulance.png' },
      { name: 'নারী ও শিশু সহায়তা', subtitle: 'Women & Child Support', number: '109', category: 'সহায়তা', icon: './assets/emergency.png' },
      { name: 'বাংলাদেশ রেলওয়ে', subtitle: 'Bangladesh Railway', number: '163', category: 'পরিবহন', icon: './assets/Bangladesh-Railway.png' },
      { name: 'দুদক', subtitle: 'Anti-Corruption Commission', number: '106', category: 'সরকারি', icon: './assets/emergency.png' },
      { name: 'বিদ্যুৎ বিভ্রাট', subtitle: 'Power Outage', number: '16216', category: 'বিদ্যুৎ', icon: './assets/emergency.png' },
      { name: 'ব্র্যাক', subtitle: 'BRAC', number: '16445', category: 'এনজিও', icon: './assets/brac.png' },
    ];

    let hearts = 0, coins = 100, copies = 0;
    const heartCount = document.getElementById('heartCount');
    const coinCount = document.getElementById('coinCount');
    const copyCount = document.getElementById('copyCount');
    const cardGrid = document.getElementById('cardGrid');
    const historyList = document.getElementById('historyList');

    function updateNavbar(){
      heartCount.textContent = hearts;
      coinCount.textContent = coins;
      copyCount.textContent = copies;
    }

    function addHistory(svc){
      const time = new Date().toLocaleTimeString();
      const li = document.createElement('li');
      li.textContent = `${svc.name} (${svc.number}) - ${time}`;
      historyList.appendChild(li);
    }

    services.forEach(svc => {
      const card = document.createElement('div');
      card.className = "bg-white shadow rounded-xl p-4 flex flex-col gap-2 relative";
      card.innerHTML = `
        <button class="absolute top-2 right-2 heart text-red-500">
          <i class="fa-solid fa-heart"></i>
        </button>
        <img src="${svc.icon}" alt="${svc.subtitle}" class="w-12 h-12 object-contain">
        <h3 class="font-bold">${svc.name}</h3>
        <p class="text-sm text-gray-600">${svc.subtitle}</p>
        <p class="font-mono text-lg text-blue-700">${svc.number}</p>
        <span class="text-xs text-white bg-green-600 px-2 py-0.5 rounded-full w-fit">${svc.category}</span>
        <div class="mt-auto flex gap-2">
          <button class="copy flex-1 bg-green-100 text-green-700 py-1 rounded"><i class="fa-solid fa-copy"></i> Copy</button>
          <button class="call flex-1 bg-blue-100 text-blue-700 py-1 rounded"><i class="fa-solid fa-phone"></i> Call</button>
        </div>
      `;
      cardGrid.appendChild(card);

      card.querySelector('.heart').addEventListener('click', () => {
        hearts++; updateNavbar();
      });

      card.querySelector('.copy').addEventListener('click', () => {
        navigator.clipboard.writeText(svc.number);
        copies++; updateNavbar();
        alert(`Copied ${svc.number}`);
      });

      card.querySelector('.call').addEventListener('click', () => {
        if (coins < 20) { alert("Not enough coins!"); return; }
        coins -= 20; updateNavbar();
        alert(`Calling ${svc.name} (${svc.number})...`);
        addHistory(svc);
      });
    });

    document.getElementById('clearHistory').addEventListener('click', ()=>{
      historyList.innerHTML = '';
    });
