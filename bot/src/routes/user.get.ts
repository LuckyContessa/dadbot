import { HttpCodes, Route } from '@sapphire/plugin-api';


export class GetUserRoute extends Route {
  public async run(request: Route.Request, response: Route.Response) {
    if (!request.auth) return response.error(HttpCodes.Unauthorized);
    const secondsTillExpiry = request.auth.expires - Date.now();
    if (secondsTillExpiry < 0) return response.error(HttpCodes.Unauthorized);

    // Refresh the auth somehow

    const loginData = await this.container.server.auth!.fetchData(request.auth.token);
    console.log(loginData)

    response.json(loginData)
  }
}