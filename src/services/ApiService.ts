import { EditForm } from "../types/EditForm";
import { PostForm } from "../types/PostForm";

export class ApiService {

  public async listAll(next: string | null = null){
    try {
      if(next){
        const response = await fetch(next)
        if(response.ok){
          const json = await response.json()
          return json
        }
      }
      const response = await fetch(process.env.REACT_APP_API_URL as string)
      if(response.ok){
        const json = await response.json()
        return json
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  public async post(data: PostForm){
    try {
      const response = await fetch(process.env.REACT_APP_API_URL as string, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      if(response.ok) return true
      
    } catch (error) {
      console.log(error)
    }
  }

  public async patch(id:number, data: EditForm){
    try {
      const response = await fetch((process.env.REACT_APP_API_URL as string) + id + '/', {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      if(response.ok) return true
      
    } catch (error) {
      console.log(error)
    }
  }

  public async delete(id:number){
    try {
      const response = await fetch((process.env.REACT_APP_API_URL as string) + id + '/', {
        method: 'DELETE',
      })
      if(response.ok) return true
      
    } catch (error) {
      console.log(error)
    }
  }

}