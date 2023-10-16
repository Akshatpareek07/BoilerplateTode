import APIService from './api.service';

export default class AccessService extends APIService {
  generateToken(username: string, password: string): Promise<any> {
    return this.apiClient.post('/access-tokens', {
      username,
      password,
    });
  }
login(username: string, password: string): Promise<any> {
  
  console.log(username,password);
    return this.apiClient.post('/gettoken', {
      username,
      password,
    });
  }

  register(username: string, password: string): Promise<any> {
    // console.log("register called");
    // console.log(username+password);
      return this.apiClient.post('/register', {
        username,
        password,
      });
    }

    addTodo(id: string,name:string,token:string): Promise<any> {
      console.log("Add Todo");
      console.log(id,name,token);
      const headers = {
        authorization: `Bearer ${token}`, // Example: Bearer token for authentication
        };

        return this.apiClient.post(`/${id}/tasks`, {
          name,
        },  { headers },);
      }

      getAllTodos(id: string,token:string): Promise<any> {
        // console.log("register called");
        // console.log(username+password);
        const headers = {
          authorization: `Bearer ${token}`, // Example: Bearer token for authentication
          };
  
          return this.apiClient.get(`/${id}/tasks`,{ headers },);
        }

        deleteTodo(id: string,token:string,t_id:string): Promise<any> {
          // console.log("register called");
          // console.log(username+password);
          // console.log(id,token,t_id);
          console.log('in access services Handeldelete');
          const headers = {
            authorization: `Bearer ${token}`, // Example: Bearer token for authentication
            };

            return this.apiClient.delete(`/${id}/tasks/${t_id}`,{ headers },);
          } 
          
        markComplete(id: string,token:string,t_id:string,isComplete:string): Promise<any> {
          // console.log("register called");
          // console.log(username+password);
          const headers = {
            authorization: `Bearer ${token}`, // Example: Bearer token for authentication
            };
            console.log(id,token,t_id,isComplete);
            
            return this.apiClient.patch(`/${id}/tasks/status/${t_id}`,{
              isComplete,
              },{ headers },);
          } 
          updateTask(id: string,token:string,t_id:string,description:string): Promise<any> {
            // console.log("register called");
            // console.log(username+password);
            const headers = {
              authorization: `Bearer ${token}`, // Example: Bearer token for authentication
              };
              // console.log(id,token,t_id,isComplete);
              
              return this.apiClient.patch(`/${id}/tasks/${t_id}`,{
                description,
                },{ headers },);
            } 
}
