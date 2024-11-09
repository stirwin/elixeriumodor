"use client"
import { useDraftModeEnvironment} from "next-sanity/hooks"
import { useRouter } from "next/navigation";


function DisableDraftMode() {
    
    const evironment = useDraftModeEnvironment();
    const router = useRouter();
    
    if(evironment !=="live" && evironment !=="unknown" ){
        return null;
    }

    const handleClick = async () => {
        await fetch ("/draft-mode/disable")
        router.refresh();
    }
  
    return (
    <button onClick={handleClick}>Disable Draft Mode</button>
  )
}

export default DisableDraftMode