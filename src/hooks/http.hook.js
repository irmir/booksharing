import { useState, useCallback } from "react"

export const useHttp = () => {
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async(url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        setError(null)
        
        try {
            if (body && body.constructor.name !== "FormData") {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})
            if (response.statusText === "No Content") {
                return true
            }
            const data = await response.json()

            if (!response.ok) {
              throw new Error(data.title || "Oops!!!!!")
            }     

            setLoading(false) 

            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }

    }, [])

    return { loading, request, error}
}