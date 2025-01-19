import axios from 'axios';


const form= document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;
declare var google: any;

const GOOGLE_API_KEY = ""
function searchAddressHandler(event:Event){
    event.preventDefault();
    const enteredAddress = addressInput.value;


    // send data to Google maps api
type GoogleMapsResponse={
    results:{geometry:{location:{lat:number,lng:number } } }[]
    status:'OK' | 'ZERO_RESULTS';
}
    axios.get<GoogleMapsResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
    .then(response =>{
        if(response.data.status!=="OK"){
            throw new Error('Could not fetch location')

        }else{
            const cordinates = response.data.results[0].geometry.location

            console.log('cordinates',cordinates)
            const map = new google.maps.Map(document.getElementById('map'),{
                center:cordinates,
                zoom:8
            })

            new google.maps.Marker({position:cordinates,map})

        }
    }
        
    ).catch(err=>{
        alert(err.message)
        console.log(err)
    })
}


form.addEventListener('submit',searchAddressHandler)

