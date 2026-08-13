import { HttpCodes, Route } from '@sapphire/plugin-api';
import { ensureAuth } from '../api_utils.ts';


export class GetUserRoute extends Route {
  public async run(request: Route.Request, response: Route.Response) {
    if (!ensureAuth(request)) return response.error(HttpCodes.Unauthorized);

    const loginData = await this.container.server.auth!.fetchData(request.auth!.token);

    response.json(loginData)
  }
}