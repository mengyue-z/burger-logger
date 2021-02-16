document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
      console.info('DOM loaded');
    }

// change devoured status
const changeDevouredBtns = document.querySelectorAll('.change-devoured');
    if (changeDevouredBtns) {
      changeDevouredBtns.forEach((button) => {
        button.addEventListener('click', (e) => {
          // Grabs the id of the element that goes by the name, "id"
          const id = e.target.getAttribute('data-id');
          const newDevoured = e.target.getAttribute('data-newdevoured');
  
          const newDevouredState = {
            devoured: newDevoured,
          };

        //   if (newDevoured){
        //     changeDevouredBtns.innerHTML = "Devour It!"
        //   } else {
        //     changeDevouredBtns.style.display = "none";
        //   }
  
          fetch(`/api/burgers/${id}`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
  
            body: JSON.stringify(newDevouredState),
          }).then((response) => {
              console.log(response);
            if (response.ok) {
              console.log(`changed devoured to: ${newDevoured}`);
              location.reload('/');
            } else {
              alert('something went wrong!');
            }
          });
        });
      });
    }
  
    // Insert
    const addBurgerBtn = document.getElementById('create-form');
  
    if (addBurgerBtn) {
        addBurgerBtn.addEventListener('submit', (e) => {
        e.preventDefault();
  
        // Grabs the value of the textarea
        const newBurger = {
          burger_name: document.getElementById('burgerName').value.trim(),
          devoured: 0,
        };
  
        // Send POST request to create a new burger
        fetch('/api/burgers', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
  
          body: JSON.stringify(newBurger),
        }).then(() => {
          document.getElementById('burgerName').value = '';
          console.log('Added a new burger!');
          location.reload();
        });
      });
    }
  });
  