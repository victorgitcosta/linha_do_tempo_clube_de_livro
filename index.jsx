const navLine = document.getElementById('timenav-line');
const navItems = document.querySelectorAll('.nav-item');
const itemWidth = 150; // Must match CSS width

navItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    updateTimeline(index);
  });
});

function updateTimeline(index) {
  // 1. Calculate the offset
  // We multiply the index by the width of each item to slide it
  const offset = index * itemWidth;
  
  // 2. Apply the transform to slide the line
  navLine.style.transform = `translateX(-${offset}px)`;
  
  // 3. Update UI states
  navItems.forEach(nav => nav.classList.remove('active'));
  navItems[index].classList.add('active');
  
  // 4. Update content (Example)
  const titles = ["Oldest Winery", "Pharaohs Power", "Israel Cellar", "Phoenicians Trade", "Rise of Greece"];
  document.getElementById('event-title').innerText = titles[index];
}