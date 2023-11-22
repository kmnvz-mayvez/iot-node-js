import { useEffect, useState } from "react";
import DeviceCard from "../components/device-card";
import axios from "axios";
import { signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider } from "../config/firebase.js";
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";

const Dashboard = () => {
   
    const [devices, setDevices] = useState([]);
    const [isLogin, setLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [show,setShow]=useState(false)
    const [data, setData] = useState("")
    const [device_name, setDeviceName] = useState("")
    const [device_value, setDeviceValue] = useState("")
    const [device_description, setDeviceDescription] = useState("")

    useEffect(()=>{
      
        const getDataDevice = async () =>{
            if (data) {
                const response = await axios.get(`https://blue-violet-bighorn-sheep-boot.cyclic.app/user/${data}`)
                console.log(response.data);
                setDevices(response.data)
            }
        }
        
        const timer = setTimeout(() => {
                getDataDevice() 
              }, 1000);
              return () => clearTimeout(timer);
    },[data])

    
    const handleRegisterdevice = async () => {
        try {
            const response = await axios.post('https://blue-violet-bighorn-sheep-boot.cyclic.app/device', {
                title: device_name, 
                description : device_description,
                value: device_value,
                authorEmail: email
            })
            console.log(response.data);
            setShow(false)
        } catch (error) {
            console.log(error);
        }
        
    }

    const handleLogInWithGoogle = async () => { 
        await signInWithPopup(auth, googleProvider)
        console.log(auth.currentUser)
        setPhotoUrl(auth.currentUser.photoURL)
        setDisplayName(auth.currentUser.displayName)
        setEmail(auth.currentUser.email)
        setLogin(true)

        await axios.post('https://blue-violet-bighorn-sheep-boot.cyclic.app/user', {
            name: auth.currentUser.displayName,
            email: auth.currentUser.email
          })
          .then(function (response) {
            console.log(response.data.id);
            setData(response.data.id);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const handleLogout = async () => {
        try {
            const response = await signOut(auth)
            setLogin(false)
            setPhotoUrl("")
            setDisplayName("")
            setEmail("")
            setData("")
            setDevices([])
            console.log(response)
          } catch (error) {
            console.error(error)
          }
    }
    
    return (
        <>
            <div className="bg-gray-200 pb-10">
                {/* Navigation starts */}
               
                {/* Navigation ends */}
                {/* Page title starts */}
                <div className="bg-gray-800 pt-8 pb-16 relative z-10">
                    <div className="container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between">
                        <div className="flex-col flex lg:flex-row items-start lg:items-center">
                            <div className="flex items-center">
                                <img className="w-14 border-2 shadow border-gray-600 rounded-full mr-3" src={photoUrl ? photoUrl : "https://cdn.tuk.dev/assets/webapp/master_layouts/boxed_layout/boxed_layout2.jpg" } alt="logo" />
                                <div>
                                    <h5 className="text-sm text-white leading-4 mb-1">{displayName ? displayName : 'Anonym'}</h5>
                                    <p className="text-xs text-gray-400 leading-4">{email ? email : 'Anonym'}</p>
                                </div>
                            </div>
                            <div className="ml-0 lg:ml-20 my-6 lg:my-0">
                                <h4 className="text-2xl font-bold leading-tight text-white mb-2">Dashboard</h4>
                                <p className="flex items-center text-gray-300 text-xs">
                                    <span>Portal</span>
                                    <span className="mx-2">&gt;</span>
                                    <span>Dashboard</span>
                                    <span className="mx-2">&gt;</span>
                                    <span>KPIs</span>
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            {
                                isLogin ? ( 
                                    <div>
                                        <button 
                                            aria-label="Continue with google" 
                                            role="button" 
                                            className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-700 flex items-center w-full mt-10 hover:bg-gray-400"
                                            onClick={handleLogout}
                                        >
                                        <p className="text-base font-medium ml-4 text-gray-200">
                                           Logout
                                            </p>
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <button 
                                            aria-label="Continue with google" 
                                            role="button" 
                                            className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-700 flex items-center w-full mt-10 hover:bg-gray-400"
                                            onClick={handleLogInWithGoogle}
                                        >        
                                            <svg width={19} height={20} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z" fill="#4285F4" />
                                                <path d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z" fill="#34A853" />
                                                <path d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z" fill="#FBBC05" />
                                                <path d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z" fill="#EB4335" />
                                            </svg>
                                            <p className="text-base font-medium ml-4 text-gray-200">Continue with Google</p>
                                        </button>
                                    </div>
                                )
                            }
                          
                          
                            <div>
                                {show &&  <div className="py-12 w-full h-screen bg-gray-100 dark:bg-gray-900 transition duration-150 ease-in-out z-50 absolute top-0 right-0 bottom-0 left-0" id="modal">
                                    <div role="alert" className="container mx-auto w-full md:w-2/3 max-w-lg">
                                        <div className="relative py-8 px-8 md:px-16 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400">
                                            <div className="w-full flex justify-center text-green-400 mb-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-check" width={56} height={56} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <circle cx={12} cy={12} r={9} />
                                                    <path d="M9 12l2 2l4 -4" />
                                                </svg>
                                            </div>
                                            <Card className="mt-6 w-96" color="transparent" shadow={false}>
                                                <Typography variant="h4" color="blue-gray">
                                                   Register Your Devices
                                                </Typography>
                                                
                                                <Typography color="gray" className="mt-1 font-normal">
                                                    Enter your details to register device.
                                                </Typography>
                                                    <div className="mb-4 flex flex-col gap-6">
                                                        <Input size="lg" label="Name" onChange={(e) => setDeviceName(e.target.value)} />
                                                        <Input size="lg" label="description"  onChange={ (e) => setDeviceDescription(e.target.value)}/>
                                                        <Input size="lg" label="Default Value" onChange={(e) => setDeviceValue(e.target.value)}/>
                                                        
                                                    </div>
                                                    <Button className="mt-6" fullWidth onClick={handleRegisterdevice}>
                                                        Register
                                                    </Button>
                                                    <Typography color="gray" className="mt-4 text-center font-normal">
                                                        I o T By {" "}
                                                        <a href="#" className="font-medium text-gray-900">
                                                        Busra IoT
                                                        </a>
                                                </Typography>
                                            </Card>
                                            <div className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-500 transition duration-150 ease-in-out" onClick={()=>setShow(!show)} >
                                                <svg xmlns="http://www.w3.org/2000/svg" aria-label="Close" className="icon icon-tabler icon-tabler-x" width={20} height={20} viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <line x1={18} y1={6} x2={6} y2={18} />
                                                    <line x1={6} y1={6} x2={18} y2={18} />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                            </div>}

                            <div className="px-1" id="button">
                                <button  
                                    className="text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-700 flex items-center w-full mt-10 hover:bg-gray-400"
                                    onClick={()=>setShow(!show)}>
                                    Add device
                                </button>
                            </div>
                            </div>
                        
                        </div>
                    </div>
                </div>
                {/* Page title ends */}
                
                <div className="container px-6 mx-auto">
                    {/* Remove class [ h-64 ] when adding a card block */}
                    <div className="rounded relative mt-20 mb-8">{/* Place your content here */}
                        <div className="flex flex-wrap justify-center">
                        
                            {
                                !!devices.device && (devices.device.map((device) => (
                                    <DeviceCard key={device.id} data={device} /> 
                                ))) 
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard