import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

export class ErrorHandler implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        let errorMessage;
        if (error.status === 0) {
          errorMessage = "Server not found!";
        } else if (error.error instanceof ErrorEvent) {
          errorMessage = "Client Error: " + error.error.message;
        } else {
          switch(error.status) {
            case 401:
              errorMessage = "Wrong Password!";
              window.alert(errorMessage);
              break;
            default:
              errorMessage = "Server Error: " + error.status + " " + error.message;
              break;
          }
        }
        return throwError(errorMessage);
      })
    );
  }

  public showError(error: any): void {
    console.error(error);
  }
}
