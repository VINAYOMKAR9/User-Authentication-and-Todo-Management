let show = document.querySelector('#showData')
let container =document.querySelector('#container')
let todoTableBody =document.querySelector('#todoTableBody')
let hlwDataDiv =document.querySelector('#hlwDataDiv')
let mainform = document.getElementById('mainform')
let form = document.getElementById('form')
show.hidden=true;



async function loginfn(){
    event.preventDefault()
    let username=form.username.value;
    let password=form.password.value;
    // console.log(username,password,'hjdkf');
    try{

        let res = await fetch('https://json-with-auth.onrender.com/user/login',
            {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({username,password})
        }) 
        let data=await res.json()

        localStorage.setItem('userToken', JSON.stringify(data)); 
        console.log(data);   
        console.log(res); 
        fetchTodo()
    }
    catch(err){
        console.log('error in code in login fn');
    }

    let hlww = document.createElement('h2');
    hlww.textContent= `hey ${username}, welcome back!`
    hlwDataDiv.append(hlww)
}

let dataTodo
async function fetchTodo(){
    let userToken = JSON.parse(localStorage.getItem('userToken'))
    let token = userToken.accessToken;
    console.log(userToken.user.id);
    try{

        let resTodo= await fetch(`https://json-with-auth.onrender.com/todos?userId=${userToken.user.id}`,{
            method:'GET',
            headers:{
                'content-type':'application/json',
                'Authorization':`bearer ${token}`
            }
        })
        
        dataTodo = await resTodo.json()
        console.log(dataTodo);
        localStorage.setItem('userCon', JSON.stringify(dataTodo)); 
        show.hidden=false       
        
    }
    catch(error){
        console.log('Error in code in fetch todo fn');
    }
    
}



container.hidden=true
show.addEventListener('click',()=>{
    mainform.hidden=true;
    container.hidden=false
    let usercon = JSON.parse(localStorage.getItem('userCon'))
    displayData(usercon)
    
})
function displayData(arr){
    todoTableBody.innerHTML = '';
    arr.map((el,ind)=>{
        // let card = document.createElement('div')
        let t1 = document.createElement('td')
        t1.textContent= el.id;

        let t2 = document.createElement('td')
        t2.textContent= el.title

        let t3 = document.createElement('td')
        t3.textContent= el.createdAt;

        let t4 = document.createElement('td')
        t4.class= 'statusData';
        
        let status= document.createElement('button')
        status.textContent= el.completed;
        // if(el.completed==null ){
        //     el.completed='null'
        //     // localStorage.setItem('userCon', JSON.stringify(dataTodo)); 
        //     let usercon = JSON.parse(localStorage.getItem('userCon'))
        //     displayData(arr)
        // }
        status.addEventListener('click',()=>{

            if(el.completed==true){
                el.completed=false
            }
            else if(el.completed==false){
                el.completed=true
            }   
            let usercon = JSON.parse(localStorage.getItem('userCon'))
            displayData(arr)
        })

        t4.append(status)

        let tr = document.createElement('tr')
        tr.append(t1, t2, t3,t4);

        todoTableBody.append(tr)
    })
}