import { BaseService } from '../../../sys/base/base.service';
import { CdAiService } from '../services/cd-ai.service';
import { CdAiTypeService } from '../services/cd-ai-type.service';
import { CdAiUsageLogsService } from '../services/cd-ai-usage-logs.service';
import { CdAiUsageLogsTypeService } from '../services/cd-ai-usage-logs-type.service';

export class CdAiController {
  
  private b: BaseService;
  
  private svCdAi: CdAiService;
  
  private svCdAiType: CdAiTypeService;

  constructor() {
    // TODO: initialize controller
  }

  // <<cd:method:constructor:start>>
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
    this.svCdAi = new CdAiService();
    this.svCdAiType = new CdAiTypeService();
  }
// <<cd:method:constructor:end>>

  // <<cd:method:create:start>>
/**
     * This is a controller method for cd-api module.
     * Controller methods act as entrypoint to requests and responses from remote consumers.
     * So it is usually advisable to:
     * 1. Do a try-catch block to handle errors gracefully.
     * 2. Give an example of sample json request.
     * {
            "ctx": "App",
            "m": "CdAi",
            "c": "CdAi",
            "a": "Create",
            "dat": {
                "f_vals": [
                    {
                        "data": {
                            "cdAiStatName": "/src/CdApi/sys/moduleman",
                            "CdAiTypeId": "7ae902cd-5bc5-493b-a739-125f10ca0268",
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
      await this.svCdAi.create(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, 'CdAiController:Create');
    }
  }
// <<cd:method:create:end>>

  // <<cd:method:getCdAi:start>>
  async getCdAi(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAi:end>>

  // <<cd:method:getCdAiType:start>>
  async getCdAiType(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiType:end>>

  // <<cd:method:getCount:start>>
  async getCount(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCount:end>>

  // <<cd:method:update:start>>
/**
     * This is the controller method for updating records.
     * It used IQuery interface for update configuration.
     * IQuery is built with sql key words eg update, where
     * {
            "ctx": "App",
            "m": "CdAis",
            "c": "CdAi",
            "a": "Update",
            "dat": {
                "f_vals": [
                    {
                        "query": {
                            "update": {
                                "cdAiAssets": null
                            },
                            "where": {
                                "cdAiStatId": 1
                            }
                        }
                    }
                ],
                "token": "08f45393-c10e-4edd-af2c-bae1746247a1"
            },
            "args": {}
        }

     * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "CdAis","c": "CdAi","a": "Update","dat": {"f_vals": [{"query": {"update": {"cdAiAssets": null},"where": {"cdAiStatId": 1}}}],"token": "08f45393-c10e-4edd-af2c-bae1746247a1"},"args": {}}' http://localhost:3001 -v  | jq '.'
     * @param req
     * @param res
     */
  async Update(req: any, res: any) {
    console.log('CdAiController::Update()/01');
    try {
      console.log('CdAiController::Update()/02');
      await this.svCdAi.update(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, 'ModuleController:Update');
    }
  }
// <<cd:method:update:end>>

  // <<cd:method:delete:start>>
/**
     * This is the controller method for delete. The design is similar to update method.
     * {
            "ctx": "App",
            "m": "CdAis",
            "c": "CdAi",
            "a": "Delete",
            "dat": {
                "f_vals": [
                    {
                        "query": {
                            "where": {"cdAiStatId": 69}
                        }
                    }
                ],
                "token": "08f45393-c10e-4edd-af2c-bae1746247a1"
            },
            "args": null
        }
     * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "CdAis","c": "CdAi","a": "Delete","dat": {"f_vals": [{"query": {"where": {"cdAiStatId": 69}}}],"token": "08f45393-c10e-4edd-af2c-bae1746247a1"},"args": {}}' http://localhost:3001 -v  | jq '.'
     * @param req
     * @param res
     */
  async Delete(req: any, res: any) {
    try {
      await this.svCdAi.delete(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, 'ModuleController:Update');
    }
  }
// <<cd:method:delete:end>>

  // <<cd:method:promptQuery:start>>
  async promptQuery(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:promptQuery:end>>

  // <<cd:method:checkTokenBalance:start>>
  async checkTokenBalance(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:checkTokenBalance:end>>

  // <<cd:method:getUserProfile:start>>
  async getUserProfile(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getUserProfile:end>>
}