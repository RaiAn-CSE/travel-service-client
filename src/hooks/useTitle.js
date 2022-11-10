import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `${title}-travel service`;
    }, [title])
}

export default useTitle;