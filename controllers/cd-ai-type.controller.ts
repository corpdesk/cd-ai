/**
 * base utils and services
 */
import { BaseService } from "../../../sys/base/base.service";
/**
 * this module
 */
import { CdAiTypeService } from "../services/cd-ai-type.service";
import { CdAiService } from "../services/cd-ai.service";

/**
 * This is a default controller based on name of the module.
 * Note the casing convention: CdAiTypeController
 */
export class CdAiTypeController {
  /**
   * BaseService is a generic service that provides common functionality
   * All controllers should have a handle to BaseService
   */
  b;
  /**
   * The naming of a service variable starts with 'sv' followed by the name of the service eg svUser.
   * Where service is 'sv' controller is 'ctl'
   */
  svCdAiType;
  svCdAiTypeType;
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
    this.svCdAiType = new CdAiTypeService();
    this.svCdAiTypeType = new CdAiTypeTypeService();
  }
  /**
       * This is a controller method for cd-api module.
       * Controller methods act as entrypoint to requests and responses from remote consumers.
       * So it is usually advisable to:
       * 1. Do a try-catch block to handle errors gracefully.
       * 2. Give an example of sample json request.
       * {
              "ctx": "App",
              "m": "CdAiType",
              "c": "CdAiType",
              "a": "Create",
              "dat": {
                  "f_vals": [
                      {
                          "data": {
                              "cdAiTypeStatName": "/src/CdApi/sys/moduleman",
                              "CdAiTypeTypeId": "7ae902cd-5bc5-493b-a739-125f10ca0268",
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
  async Create(req, res) {
    try {
      await this.svCdAiType.create(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "CdAiTypeController:Create");
    }
  }
  /**
   * CreateM stands for Create multiple
   * @param req
   * @param res
   */
  async CreateM(req, res) {
    try {
      await this.svCdAiType.createM(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "CdAiTypeController:CreateM");
    }
  }
  /**
   * CreateSL stands for Create via sqlite. SL is short for Sqlite.
   * In corpdesk any method that ends with SL is a method that uses sqlite.
   * @param req
   * @param res
   */
  async CreateSL(req, res) {
    try {
      await this.svCdAiType.createSL(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "CdAiTypeController:CreateSL");
    }
  }
  /**
       * This is a controller method to fetch CdAiType data.
       * The query property has obects whose interface is based on the IQuery interface.
       * Corpdesk IQuery interfce is structured around sql querying models.
       * You can set 'select', 'where', 'take', 'skip' and other properties.
       * {
              "ctx": "App",
              "m": "CdAiType",
              "c": "CdAiType",
              "a": "Get",
              "dat": {
                  "f_vals": [
                      {
                          "query": {
                              "where": {"cdAiTypeStatName": "Kenya"}
                          }
                      }
                  ],
                  "token": "08f45393-c10e-4edd-af2c-bae1746247a1"
              },
              "args": null
          }
  
          curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App", "m": "CdAiTypes","c": "CdAiType","a": "Get","dat": {"f_vals": [{"query": {"where": {"cdAiTypeStatName": "Kenya"}}}],"token":"08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'
       * @param req
       * @param res
       */
  async Get(req, res) {
    try {
      await this.svCdAiType.getCdAiType(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "CdAiTypeController:Get");
    }
  }
  /**
   * This is the 'Get' method that uses sqlite.
   * @param req
   * @param res
   */
  async GetSL(req, res) {
    try {
      await this.svCdAiType.getCdAiTypeSL(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "CdAiTypeController:GetSL");
    }
  }
  /**
       * This is a controller method to fetch CdAiType Type data.
       * {
              "ctx": "App",
              "m": "CdAiTypes",
              "c": "CdAiType",
              "a": "GetType",
              "dat": {
                  "f_vals": [
                      {
                          "query": {
                              "where": {"cdAiTypeTypeId": 100}
                          }
                      }
                  ],
                  "token": "08f45393-c10e-4edd-af2c-bae1746247a1"
              },
              "args": null
          }
  
          curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "CdAiTypes","c": "CdAiType","a": "GetType","dat":{"f_vals": [{"query":{"where": {"cdAiTypeTypeId":100}}}],"token":"08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'
       * @param req
       * @param res
       */
  async GetType(req, res) {
    try {
      // await this.svCdAiType.getCdAiTypeType(req, res);
      await this.svCdAiType.getCdObjTypeCount(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "CdAiTypeController:Get");
    }
  }
  /** Pageable request:
       *  Get count is used by controller method to apply pagable queries.
       *  Part of the return is also a count of records.
       *  'QB' on the name signify use of typeorm Query Builder.
       * {
              "ctx": "App",
              "m": "CdAiTypes",
              "c": "CdAiType",
              "a": "GetCount",
              "dat": {
                  "f_vals": [
                      {
                          "query": {
                              "select":["cdAiTypeStatId","cdAiTypeStatGuid"],
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
  
       curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "CdAiTypes","c": "CdAiType","a": "GetCount","dat": {"f_vals": [{"query": {"select":["cdAiTypeStatId","cdAiTypeStatGuid"],"where": {}, "take":5,"skip": 1}}],"token": "08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'
  
       * @param req
       * @param res
       */
  async GetCount(req, res) {
    try {
      await this.svCdAiType.getCdAiTypeQB(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "CdAiTypeController:GetCount");
    }
  }
  /** Pageable request:
       * GetCount without 'QB' is a pagable query without use of typeorm Query Builder
       * {
              "ctx": "App",
              "m": "CdAiTypes",
              "c": "CdAiType",
              "a": "GetPaged",
              "dat": {
                  "f_vals": [
                      {
                          "query": {
                              "select":["cdAiTypeStatId","cdAiTypeStatGuid"],
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
  
       curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "CdAiTypes","c": "CdAiType","a": "GetPaged","dat": {"f_vals": [{"query": {"select":["cdAiTypeStatId","cdAiTypeStatGuid"],"where": {}, "take":5,"skip": 1}}],"token": "08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'
  
       * @param req
       * @param res
       */
  async GetPaged(req, res) {
    try {
      await this.svCdAiType.getCdAiTypePaged(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "ModuleController:Get");
    }
  }
  /**
   * GetPagedSL is just like GetPaged but dedicated to Sqlite
   * @param req
   * @param res
   */
  async GetPagedSL(req, res) {
    try {
      await this.svCdAiType.getPagedSL(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "CdAiTypeController:GetSL");
    }
  }
  /**
       * This is the controller method for updating records.
       * It used IQuery interface for update configuration.
       * IQuery is built with sql key words eg update, where
       * {
              "ctx": "App",
              "m": "CdAiTypes",
              "c": "CdAiType",
              "a": "Update",
              "dat": {
                  "f_vals": [
                      {
                          "query": {
                              "update": {
                                  "cdAiTypeAssets": null
                              },
                              "where": {
                                  "cdAiTypeStatId": 1
                              }
                          }
                      }
                  ],
                  "token": "08f45393-c10e-4edd-af2c-bae1746247a1"
              },
              "args": {}
          }
  
       * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "CdAiTypes","c": "CdAiType","a": "Update","dat": {"f_vals": [{"query": {"update": {"cdAiTypeAssets": null},"where": {"cdAiTypeStatId": 1}}}],"token": "08f45393-c10e-4edd-af2c-bae1746247a1"},"args": {}}' http://localhost:3001 -v  | jq '.'
       * @param req
       * @param res
       */
  async Update(req, res) {
    console.log("CdAiTypeController::Update()/01");
    try {
      console.log("CdAiTypeController::Update()/02");
      await this.svCdAiType.update(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "ModuleController:Update");
    }
  }
  /**
   * This is the update version for sqlite
   * @param req
   * @param res
   */
  async UpdateSL(req, res) {
    console.log("CdAiTypeController::UpdateSL()/01");
    try {
      console.log("CdAiTypeController::UpdateSL()/02");
      await this.svCdAiType.updateSL(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "CdAiTypeController:UpdateSL");
    }
  }
  /**
       * This is the controller method for delete. The design is similar to update method.
       * {
              "ctx": "App",
              "m": "CdAiTypes",
              "c": "CdAiType",
              "a": "Delete",
              "dat": {
                  "f_vals": [
                      {
                          "query": {
                              "where": {"cdAiTypeStatId": 69}
                          }
                      }
                  ],
                  "token": "08f45393-c10e-4edd-af2c-bae1746247a1"
              },
              "args": null
          }
       * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "CdAiTypes","c": "CdAiType","a": "Delete","dat": {"f_vals": [{"query": {"where": {"cdAiTypeStatId": 69}}}],"token": "08f45393-c10e-4edd-af2c-bae1746247a1"},"args": {}}' http://localhost:3001 -v  | jq '.'
       * @param req
       * @param res
       */
  async Delete(req, res) {
    try {
      await this.svCdAiType.delete(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "ModuleController:Update");
    }
  }
  /**
   * This is the sqlite version of delete method
   * @param req
   * @param res
   */
  async DeleteSL(req, res) {
    try {
      await this.svCdAiType.deleteSL(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "BillController:DeleteSL");
    }
  }
  /**
   * This controller method is used for creating CdAiType type
   * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "CdAiTypes","c": "CdAiType","a": "CreateType","dat": {"f_vals": [{"data": {"cdAiTypeTypeName": "Continental Apex"}}],"token": "3ffd785f-e885-4d37-addf-0e24379af338"},"args": {}}' http://localhost:3001 -v  | jq '.'
   * @param req
   * @param res
   */
  async CreateType(req, res) {
    try {
      await this.svCdAiTypeType.create(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "CdAiTypeController:CreateType");
    }
  }
  /**
   * This method is used ro updating CdAiType type
   * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "CdAiTypes","c": "CdAiType","a": "UpudateType","dat": {"f_vals": [{"data": {"cdAiTypeTypeName": "Continental Apex"}}],"token": "3ffd785f-e885-4d37-addf-0e24379af338"},"args": {}}' http://localhost:3001 -v  | jq '.'
   * @param req
   * @param res
   */
  async UpdateType(req, res) {
    try {
      await this.svCdAiTypeType.update(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "CdAiTypeController:EditType");
    }
  }
  /**
   * Method for deleting CdAiType type
   * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "CdAiTypes","c": "CdAiType","a": "DeleteType","dat": {"f_vals": [{"query": {"where": {"cdAiTypeTypeId": 107}}}],"token": "08f45393-c10e-4edd-af2c-bae1746247a1"},"args": {}}' http://localhost:3001 -v  | jq '.'
   * @param req
   * @param res
   */
  async DeleteType(req, res) {
    try {
      await this.svCdAiTypeType.delete(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "CdAiTypeController:DeleteType");
    }
  }
}
