import { BaseService } from '../../../sys/base/base.service';
import { CdAiService } from '../services/cd-ai.service';
import { CdAiUsageLogsService } from '../services/cd-ai-usage-logs.service';

export class CdAiController {
  constructor() {
    // TODO: initialize controller
  }

  async /**
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

  async /**
     * This is a controller method to fetch Abcd data.
     * The query property has obects whose interface is based on the IQuery interface.
     * Corpdesk IQuery interfce is structured around sql querying models.
     * You can set 'select', 'where', 'take', 'skip' and other properties.
     * {
            "ctx": "App",
            "m": "Abcd",
            "c": "Abcd",
            "a": "Get",
            "dat": {
                "f_vals": [
                    {
                        "query": {
                            "where": {"abcdStatName": "Kenya"}
                        }
                    }
                ],
                "token": "08f45393-c10e-4edd-af2c-bae1746247a1"
            },
            "args": null
        }

        curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App", "m": "Abcds","c": "Abcd","a": "Get","dat": {"f_vals": [{"query": {"where": {"abcdStatName": "Kenya"}}}],"token":"08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'
     * @param req
     * @param res
     */
  async Get(req: any, res: any) {
    try {
      await this.svAbcd.getAbcd(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, 'AbcdController:Get');
    }
  }

  async /**
     * This is a controller method to fetch Abcd Type data.
     * {
            "ctx": "App",
            "m": "Abcds",
            "c": "Abcd",
            "a": "GetType",
            "dat": {
                "f_vals": [
                    {
                        "query": {
                            "where": {"abcdTypeId": 100}
                        }
                    }
                ],
                "token": "08f45393-c10e-4edd-af2c-bae1746247a1"
            },
            "args": null
        }

        curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "Abcds","c": "Abcd","a": "GetType","dat":{"f_vals": [{"query":{"where": {"abcdTypeId":100}}}],"token":"08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'
     * @param req
     * @param res
     */
  async GetType(req: any, res: any) {
    try {
      // await this.svAbcd.getAbcdType(req, res);
      await this.svAbcd.getCdObjTypeCount(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, 'AbcdController:Get');
    }
  }

  async /** Pageable request:
     *  Get count is used by controller method to apply pagable queries.
     *  Part of the return is also a count of records.
     *  'QB' on the name signify use of typeorm Query Builder.
     * {
            "ctx": "App",
            "m": "Abcds",
            "c": "Abcd",
            "a": "GetCount",
            "dat": {
                "f_vals": [
                    {
                        "query": {
                            "select":["abcdStatId","abcdStatGuid"],
                            "where": {},
                            "take": 5,
                            "skip": 1
                            }
                    }
                ],
                "token": "29947F3F-FF52-9659-F24C-90D716BC77B2"
            },
            "args": null
        }

     curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "Abcds","c": "Abcd","a": "GetCount","dat": {"f_vals": [{"query": {"select":["abcdStatId","abcdStatGuid"],"where": {}, "take":5,"skip": 1}}],"token": "08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'

     * @param req
     * @param res
     */
  async GetCount(req: any, res: any) {
    try {
      await this.svAbcd.getAbcdQB(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, 'AbcdController:GetCount');
    }
  }

  async /**
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

  async /**
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

  async PromptQuery(): Promise<void> {
    // TODO: implement
  }

  async CheckTokenBalance(): Promise<void> {
    // TODO: implement
  }

  async GetUserProfile(): Promise<void> {
    // TODO: implement
  }
}