import { BaseService } from '../../../sys/base/base.service';
import { CdAiService } from '../services/cd-ai.service';
import { CdAiTypeService } from '../services/cd-ai-type.service';
import { CdAiUsageLogsService } from '../services/cd-ai-usage-logs.service';
import { CdAiUsageLogsTypeService } from '../services/cd-ai-usage-logs-type.service';

export class CdAiUsageLogsController {
  
  private b: BaseService;
  
  private svCdAiUsageLogs: CdAiUsageLogsService;
  
  private svCdAiUsageLogsType: CdAiUsageLogsTypeService;

  constructor() {
    // TODO: initialize controller
  }

  /**
   * Note that in corpdesk, dependency injection is not used.
   * Instead, we instantiate the services directly in the controller.
   * It is also discouraged to use the `new` keyword in the constructor, unless absolutely necessary.
   * It is best to apply new() in the specific methods where the service is needed.
   */
  constructor() {
    this.b = new BaseService();
    /**
     * Services can be initialized here, but it is better to do so in the methods where they are needed.
     * This avoids potential issues with circular dependencies and keeps the controller lightweight.
     */
    this.svAbcd = new AbcdService();
    this.svAbcdType = new AbcdTypeService();
  }

  /**
     * This is a controller method for cd-api module.
     * Controller methods act as entrypoint to requests and responses from remote consumers.
     * So it is usually advisable to:
     * 1. Do a try-catch block to handle errors gracefully.
     * 2. Give an example of sample json request.
     * {
            "ctx": "App",
            "m": "Abcd",
            "c": "Abcd",
            "a": "Create",
            "dat": {
                "f_vals": [
                    {
                        "data": {
                            "abcdStatName": "/src/CdApi/sys/moduleman",
                            "AbcdTypeId": "7ae902cd-5bc5-493b-a739-125f10ca0268",
                            "parentModuleGuid": "00e7c6a8-83e4-40e2-bd27-51fcff9ce63b"
                        }
                    }
                ],
                "token": "3ffd785f-e885-4d37-addf-0e24379af338"
            },
            "args": {}
        }
     * @param req
     * @param res
     */
  async Create(req: any, res: any) {
    try {
      await this.svAbcd.create(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, 'AbcdController:Create');
    }
  }

  // <<cd:method:getCdAiUsageLogs:start>>
  async getCdAiUsageLogs(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiUsageLogs:end>>

  // <<cd:method:getCdAiUsageLogsType:start>>
  async getCdAiUsageLogsType(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiUsageLogsType:end>>

  // <<cd:method:getCount:start>>
  async getCount(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCount:end>>

  /**
     * This is the controller method for updating records.
     * It used IQuery interface for update configuration.
     * IQuery is built with sql key words eg update, where
     * {
            "ctx": "App",
            "m": "Abcds",
            "c": "Abcd",
            "a": "Update",
            "dat": {
                "f_vals": [
                    {
                        "query": {
                            "update": {
                                "abcdAssets": null
                            },
                            "where": {
                                "abcdStatId": 1
                            }
                        }
                    }
                ],
                "token": "08f45393-c10e-4edd-af2c-bae1746247a1"
            },
            "args": {}
        }

     * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "Abcds","c": "Abcd","a": "Update","dat": {"f_vals": [{"query": {"update": {"abcdAssets": null},"where": {"abcdStatId": 1}}}],"token": "08f45393-c10e-4edd-af2c-bae1746247a1"},"args": {}}' http://localhost:3001 -v  | jq '.'
     * @param req
     * @param res
     */
  async Update(req: any, res: any) {
    console.log('AbcdController::Update()/01');
    try {
      console.log('AbcdController::Update()/02');
      await this.svAbcd.update(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, 'ModuleController:Update');
    }
  }

  /**
     * This is the controller method for delete. The design is similar to update method.
     * {
            "ctx": "App",
            "m": "Abcds",
            "c": "Abcd",
            "a": "Delete",
            "dat": {
                "f_vals": [
                    {
                        "query": {
                            "where": {"abcdStatId": 69}
                        }
                    }
                ],
                "token": "08f45393-c10e-4edd-af2c-bae1746247a1"
            },
            "args": null
        }
     * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "Abcds","c": "Abcd","a": "Delete","dat": {"f_vals": [{"query": {"where": {"abcdStatId": 69}}}],"token": "08f45393-c10e-4edd-af2c-bae1746247a1"},"args": {}}' http://localhost:3001 -v  | jq '.'
     * @param req
     * @param res
     */
  async Delete(req: any, res: any) {
    try {
      await this.svAbcd.delete(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, 'ModuleController:Update');
    }
  }

  // <<cd:method:logUsage:start>>
  async logUsage(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:logUsage:end>>

  // <<cd:method:getUsageSummary:start>>
  async getUsageSummary(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getUsageSummary:end>>
}