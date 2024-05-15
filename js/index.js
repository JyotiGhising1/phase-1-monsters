document.addEventListener('DOMContentLoaded', () =>{
    const monsterContainer = document.getElementById('monster-container')
    const createMonsterDIv = document.getElementById('create-monster')
    const backbtn = document.getElementById('back')
    const forwardbtn = document.getElementById('forward')

    let page = 1

    const fetchMonsters =(page) =>{
        fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
        .then(response => response.json)
        .then(monsters => {
            monsterContainer.innerHTML = ''
            monsters.forEach(monster => {
                const monsterDiv = document.createElement('div')
                monsterDiv.innerHTML = `
                <h2>${monster.name}<h2>
                <p>${monster.age}</p>
                <p>Description: ${monster.description}</p>
                `
                monsterContainer.appendChild(monsterDiv)
            })
        })
    }

    const createMonsterForm = () =>{
        const form = document.createElement('form')
        form.id = 'monster-form'

        const nameInput = document.createElement('input')
        nameInput.id = 'name'
        nameInput.placeholder = 'name...'

        const ageInput = document.createElement('input')
        ageInput.id = 'age'
        ageInput.placeholder = 'age...'

        const descriptionInput = document.createElement('input')
        descriptionInput.id = 'description'
        descriptionInput.placeholder = 'description...'

        const createBtn = document.createElement('button')
        createBtn.innerText = 'Create Monster'

        form.appendChild(nameInput)
        form.appendChild(ageInput)
        form.appendChild(descriptionInput)
        form.appendChild(createBtn)

        createMonsterDIv.appendChild(form)


        form.addEventListener('submit', (event)=>{
            event.preventDefault()
            const newMonster = {
                name: nameInput.value,
                age: ageInput.value,
                description: descriptionInput.value
            }
            fetch(`http://localhost:3000/monsters`, {
                method:'POST', 
                header: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newMonster)
            })
            .then(response => response.json)
            .then(monster => {
                console.log('Monster created: ', monster)
                fetchMonsters(page)
                form.reset
            })
        })
    }
    backbtn.addEventListener('click', ()=>{
        if(page>1){
            page-- 
            fetchMonsters(page)
        }
    })
   forwardbtn.addEventListener('click', ()=>{
    page++
    fetchMonsters(page)
   })

   createMonsterForm()
   fetchMonsters(page)
   
})
