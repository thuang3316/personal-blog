const typeFilter = document.getElementById('typeFilter');
const orderSwitch = document.getElementById('orderSwitch');
const blogsList = document.getElementById('blogsList');

function filterAndSortBlogs() {
    const selectedType = typeFilter.value;
    const orderBy = orderSwitch.value;
    
    let blogItems = Array.from(document.querySelectorAll('.blog-item'));
    
    blogItems.forEach(item => {
        const title = item.dataset.title.toLowerCase();
        const type = item.dataset.type;
        
        const matchesType = selectedType === '' || type === selectedType;
        
        if (matchesType) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
    
    const visibleItems = blogItems.filter(item => item.style.display !== 'none');
    
    if (orderBy === 'title') {
        visibleItems.sort((a, b) => {
            return a.dataset.title.localeCompare(b.dataset.title);
        });
    } else if (orderBy === 'publish_date') {
        visibleItems.sort((a, b) => {
            return new Date(b.dataset.date) - new Date(a.dataset.date); // Newest first
        });
    }
    
    visibleItems.forEach(item => {
        blogsList.appendChild(item);
    });
}

typeFilter.addEventListener('change', filterAndSortBlogs);
orderSwitch.addEventListener('change', filterAndSortBlogs);