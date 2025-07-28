import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

const BASE_URL = 'https://catmapp-backend.onrender.com';

@Injectable()
export class WebService {
  tasks_list: any;
  sumamry_data: any;

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(`${BASE_URL}/tasks`).subscribe((response: any) => {
      this.tasks_list = response;
      console.log("here is data", response);
    });
  }

  getTasksObservable(): Observable<any> {
    return this.http.get(`${BASE_URL}/tasks`);
  }

  addTask(newTask: any): Observable<any> {
    let postData = {
      name: newTask.name,
      label: newTask.label,
      time: newTask.time,
      description: newTask.description,
      date: newTask.date,
      status: newTask.status,
      priority: newTask.priority
    };
    console.log("saving", { postData });
    return this.http.post(`${BASE_URL}/addTask`, postData);
  }

  getTask(id: any): Observable<any> {
    return this.http.get(`${BASE_URL}/task/${id}`);
  }

  deleteTask(id: any): Observable<any> {
    console.log('id', id);
    return this.http.delete(`${BASE_URL}/task-del/${id}`);
  }

  updateTask(id: any, updated_task: any): Observable<any> {
    let putData = {
      name: updated_task.name,
      label: updated_task.label,
      time: updated_task.time,
      description: updated_task.description,
      date: updated_task.date,
      status: updated_task.status,
      priority: updated_task.priority
    };
    console.log({ putData });
    return this.http.put(`${BASE_URL}/update-task/${id}`, putData);
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${BASE_URL}/register`, userData);
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${BASE_URL}/login`, credentials);
  }

  getTimeSummary(): Observable<any> {
    return this.http.get(`${BASE_URL}/task-summary/time`).pipe(
      map((response: any) => {
        console.log("here is summary data", response);
        return response;
      }),
      map((data: any[]) =>
        data.map((item: any) => ({
          _id: item._id,
          total_time: item.total_time
        }))
      )
    );
  }

  getDateSummary(startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${BASE_URL}/task-summary/date`, {
      params: {
        start_date: startDate,
        end_date: endDate
      }
    }).pipe(
      map((response: any) => {
        console.log("here is summary data", response);
        return response;
      }),
      map((data: any[]) =>
        data.map((item: any) => ({
          _id: item._id,
          total_time: item.total_time
        }))
      )
    );
  }

  getStatusSummary(): Observable<any> {
    return this.http.get(`${BASE_URL}/task-summary/status`).pipe(
      map((response: any) => {
        console.log("here is summary data", response);
        return response;
      }),
      map((data: any[]) =>
        data.map((item: any) => ({
          _id: item._id,
          total_time: item.total_time
        }))
      )
    );
  }

  getPrioritySummary(): Observable<any> {
    return this.http.get(`${BASE_URL}/task-summary/priority`).pipe(
      map((response: any) => {
        console.log("here is summary data", response);
        return response;
      }),
      map((data: any[]) =>
        data.map((item: any) => ({
          _id: item._id,
          total_time: item.total_time
        }))
      )
    );
  }

  getLabelMultilineSummary(): Observable<any> {
    return this.http.get(`${BASE_URL}/task-summary/multiline-plot`).pipe(
      map((response: any) => {
        console.log("here is multiline-plot data", { response });
        return response;
      }),
      map((data: { [key: string]: { date: string, total_time: number }[] }) => data)
    );
  }
}
