/**
 * npm modules
 */
import { Like } from "typeorm";
/**
 * base utils and services
 */
import { BaseService } from "../../../sys/base/base.service.js";
import { ValidationRulesBuilder } from "../../../sys/base/validation-rules-builder.js";
/**
 * utils and services
 */
import { QueryTransformer } from "../../../sys/utils/query-transformer.js";
/**
 * sys modules
 */
import { SessionService } from "../../../sys/user/services/session.service.js";
/**
 * this module
 */
import { CdAiModel } from "../models/cdAi.model.js";
import { CdAiTypeModel } from "../models/cdAi-type.model.js";
import { CdAiViewModel } from "../models/cdAi-view.model.js";
export class CdAiService {
  // logger: Logging;
  b; // instance of BaseService
  cdToken;
  srvSess;
  srvUser;
  user;
  serviceModel;
  modelName;
  sessModel;
  sessDataExt;
  // moduleModel: ModuleModel;
  arrLikeConditions = [];
  /*
   * create rules
   */
  cRules = {
    required: ["cdAiName", "cdAiTypeId"],
    noDuplicate: ["cdAiName", "cdAiTypeId"],
  };
  uRules;
  dRules;
  constructor() {
    this.b = new BaseService();
    // this.logger = new Logging();
    this.serviceModel = new CdAiModel();
  }
  async initSession(req, res) {
    const svSess = new SessionService();
    // this.sessDataExt = await svSess.getSessionDataExt(req, res);
  }
  /**
       * Create from new company:
       *  - Create company, then create cdAi
       *
       * Create from existing company
       *  - select company then create cdAi
      * {
         "ctx": "App",
         "m": "CdAis",
         "c": "CdAi",
         "a": "Create",
         "dat": {
             "f_vals": [
             {
                 "data": {
                     "cdAiGuid":"",
                     "cdAiName": "Benin",
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
  async create(req, res) {
    const svSess = new SessionService();
    const fValsArray = req.body.dat.f_vals || [];
    const results = [];
    // Build rules + existence map once
    const { rules, existenceMap } = new ValidationRulesBuilder()
      .require(...this.cRules.required)
      .noDuplicate(...this.cRules.noDuplicate)
      .mustExist("userId", CdAiModel)
      .mustExist("cdAiId", CdAiModel)
      .build();
    const validationCreateParams = {
      controllerInstance: this,
      model: CdAiModel,
    };
    for (let fVal of fValsArray) {
      req.body.dat.f_vals = [fVal];
      if (
        await this.b.validateCreateGeneric(
          req,
          res,
          rules,
          existenceMap,
          validationCreateParams,
        )
      ) {
        // Success path
        const pl = this.b.getPlData(req);
        await this.b.beforeCreateGeneric(req, {
          cdAiGuid: "GUID",
          cdAiEnabled: true,
          cdAiTypeId: 108,
        });
        const serviceInput = this.b.serviceInputCRUD(this);
        const respData = await this.b.create(req, res, serviceInput);
        results.push(respData);
      } else {
        // Failure path
        this.b.i.app_msg = `Validation failed`;
        this.b.err.push(this.b.i.app_msg);
        await this.b.setAppState(false, this.b.i, svSess.sessResp);
      }
    }
    if (this.b.err.length > 0) {
      this.b.cdResp.app_state.info.messages = this.b.err;
      await this.b.setAppState(false, this.b.i, svSess.sessResp);
    } else {
      await this.b.setAppState(true, this.b.i, svSess.sessResp);
    }
    this.b.cdResp.data = results;
    await this.b.respond(req, res);
  }
  async createSL(req, res) {
    const svSess = new SessionService();
    await this.b.initSqlite(req, res);
    if (await this.validateCreateSL(req, res)) {
      await this.beforeCreateSL(req, res);
      const serviceInput = {
        serviceInstance: this,
        serviceModel: CdAiModel,
        serviceModelInstance: this.serviceModel,
        docName: "Create CdAi",
        dSource: 1,
      };
      const result = await this.b.createSL(req, res, serviceInput);
      this.b.connSLClose();
      this.b.i.app_msg = "";
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = result;
      const r = await this.b.respond(req, res);
    } else {
      const r = await this.b.respond(req, res);
    }
  }
  async createI(req, res, createIParams) {
    return await this.b.createI(req, res, createIParams);
  }
  /**
       * CreateM, Create multiple records
       *  - 1. validate the loop field for multiple data
       *  - 2. loop through the list
       *  - 3. in each cycle:
       *      - get createItem
       *      - createI(createItem)
       *      - save return value
       *  - 4. set return data
       *  - 5. return data
       *
       * {
          "ctx": "App",
          "m": "CdAis",
          "c": "CdAi",
          "a": "CreateM",
          "dat": {
              "f_vals": [
              {
                  "data": [
                  {
                      "cdAiGuid": "",
                      "cdAiName": "Kenya",
                      "cdAiDescription": "2006",
                      "cdGeoLocationId": null,
                      "cdAiWoccu": false,
                      "cdAiCount": 2993,
                      "cdAiEfgsCount": 3265545,
                      "cdAiSavesShares": 1608009012,
                      "cdAiLoans": 1604043550,
                      "cdAiReserves": 102792479,
                      "cdAiAssets": 2146769999,
                      "cdAiEfgPenetration": 16.01,
                      "cdAiDateLabel": "2006-12-31 23:59:59",
                      "cdAiRefId": null
                  },
                  {
                      "cdAiGuid": "",
                      "cdAiName": "Malawi",
                      "cdAiDescription": "2006",
                      "cdGeoLocationId": null,
                      "cdAiWoccu": false,
                      "cdAiCount": 70,
                      "cdAiEfgsCount": 62736,
                      "cdAiSavesShares": 6175626,
                      "cdAiLoans": 4946246,
                      "cdAiReserves": 601936,
                      "cdAiAssets": 7407250,
                      "cdAiEfgPenetration": 0.9,
                      "cdAiDateLabel": "2006-12-31 23:59:59",
                      "cdAiRefId": null
                  }
                  ]
              }
              ],
              "token": "3ffd785f-e885-4d37-addf-0e24379af338"
          },
          "args": {}
          }
       *
       *
       * @param req
       * @param res
       */
  async createM(req, res) {
    let data = req.post.dat.f_vals[0].data;
    for (var cdAiData of data) {
      const cdAiQuery = cdAiData;
      const svCdAi = new CdAiService();
      const si = {
        serviceInstance: svCdAi,
        serviceModel: CdAiModel,
        serviceModelInstance: svCdAi.serviceModel,
        docName: "CdAiService::CreateM",
        dSource: 1,
      };
      const createIParams = {
        serviceInput: si,
        controllerData: cdAiQuery,
      };
      let ret = await this.createI(req, res, createIParams);
    }
    // return current sample data
    // eg first 5
    // this is just a sample for development
    // producation can be tailored to requrement
    // and the query can be set from the client side.
    let q = {
      // "select": [
      //     "cdAiName",
      //     "cdAiDescription"
      // ],
      where: {},
      take: 5,
      skip: 0,
    };
    this.getCdAi(req, res, q);
  }
  async CdAiExists(req, res) {
    const serviceInput = this.b.serviceInputGet(this);
    return this.b.read(req, res, serviceInput);
  }
  async beforeCreateSL(req, res) {
    this.b.setPlData(req, { key: "cdAiGuid", value: this.b.getGuid() });
    this.b.setPlData(req, { key: "cdAiEnabled", value: true });
    return true;
  }
  async read(req, res, serviceInput) {
    return this.b.read(req, res, serviceInput);
  }
  async readSL(req, res, serviceInput) {
    await this.b.initSqlite(req, res);
    const q = this.b.getQuery(req);
    try {
      this.b.readSL$(req, res, serviceInput).subscribe((r) => {
        // this.logger.logInfo('CdAiService::read$()/r:', r)
        this.b.i.code = "CdAiService::Get";
        const svSess = new SessionService();
        svSess.sessResp.cd_token = req.post.dat.token;
        svSess.sessResp.ttl = svSess.getTtl();
        this.b.setAppState(true, this.b.i, svSess.sessResp);
        this.b.cdResp.data = r;
        this.b.connSLClose();
        this.b.respond(req, res);
      });
    } catch (e) {
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "CdAiService:update",
        app_msg: "",
      };
      await this.b.serviceErr(req, res, e, i.code);
      await this.b.respond(req, res);
    }
  }
  update(req, res) {
    // this.logger.logInfo('CdAiService::update()/01');
    let q = this.b.getQuery(req);
    q = this.beforeUpdate(q);
    const serviceInput = {
      serviceModel: CdAiModel,
      docName: "CdAiService::update",
      cmd: {
        action: "update",
        query: q,
      },
      dSource: 1,
    };
    // this.logger.logInfo('CdAiService::update()/02')
    this.b.update$(req, res, serviceInput).subscribe((ret) => {
      this.b.cdResp.data = ret;
      this.b.respond(req, res);
    });
  }
  updateSL(req, res) {
    let q = this.b.getQuery(req);
    q = this.beforeUpdateSL(q);
    const serviceInput = {
      serviceModel: CdAiModel,
      docName: "CdAiService::update",
      cmd: {
        action: "update",
        query: q,
      },
      dSource: 1,
    };
    this.b.updateSL$(req, res, serviceInput).subscribe((ret) => {
      this.b.cdResp.data = ret;
      this.b.connSLClose();
      this.b.respond(req, res);
    });
  }
  /**
   * harmonise any data that can
   * result in type error;
   * @param q
   * @returns
   */
  beforeUpdate(q) {
    if (q.update.CdAiEnabled === "") {
      q.update.CdAiEnabled = null;
    }
    return q;
  }
  beforeUpdateSL(q) {
    if (q.update.billEnabled === "") {
      q.update.billEnabled = null;
    }
    return q;
  }
  async remove(req, res) {
    //
  }
  /**
   * methods for transaction rollback
   */
  rbCreate() {
    return 1;
  }
  rbUpdate() {
    return 1;
  }
  rbDelete() {
    return 1;
  }
  async validateCreateSL(req, res) {
    return true;
  }
  /**
   *
   * curl test:
   * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App", "m": "CdAis","c": "CdAi","a": "Get","dat": {"f_vals": [{"query": {"where": {"cdAiName": "Kenya"}}}],"token":"08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'
   * @param req
   * @param res
   * @param q
   */
  async getCdAi(req, res, q) {
    if (q === null) {
      q = this.b.getQuery(req);
    }
    // const serviceInput = siGet(q,this)
    this.serviceModel = new CdAiModel();
    const serviceInput = this.b.siGet(q, this);
    serviceInput.serviceModelInstance = this.serviceModel;
    serviceInput.serviceModel = CdAiModel;
    try {
      const r = await this.b.read(req, res, serviceInput);
      this.b.successResponse(req, res, r);
    } catch (e) {
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "BaseService:update",
        app_msg: "",
      };
      await this.b.serviceErr(req, res, e, i.code);
      await this.b.respond(req, res);
    }
  }
  /**
   * Queey params:
   * - selected data level eg all-available, world, continent, country, continental-region, national-region
   * - list of selected items
   * - eg:
   * - on selection of all-available, show list of countries availaable with summary data
   * - on selection of world show continents with available data
   * - on selection of continent show list of countries availaable with summary data
   * - on selection of countrie list of national-resions availaable with summary data
   * - on selection of national-region given national-resion with summary data
   * @param q
   */
  async getCdAis(req, res, q) {
    if (q === null) {
      q = this.b.getQuery(req);
    }
    const serviceInput = this.b.serviceInputGet(this);
    try {
      const r = await this.b.read(req, res, serviceInput);
      this.b.successResponse(req, res, r);
    } catch (e) {
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "BaseService:update",
        app_msg: "",
      };
      await this.b.serviceErr(req, res, e, i.code);
      await this.b.respond(req, res);
    }
  }
  async getCdAiSL(req, res) {
    await this.b.initSqlite(req, res);
    const q = this.b.getQuery(req);
    const serviceInput = this.b.serviceInputGet(this);
    try {
      this.b.readSL$(req, res, serviceInput).subscribe((r) => {
        // this.logger.logInfo('CdAiService::read$()/r:', r)
        this.b.i.code = "CdAiService::Get";
        const svSess = new SessionService();
        svSess.sessResp.cd_token = req.post.dat.token;
        svSess.sessResp.ttl = svSess.getTtl();
        this.b.setAppState(true, this.b.i, svSess.sessResp);
        this.b.cdResp.data = r;
        this.b.connSLClose();
        this.b.respond(req, res);
      });
    } catch (e) {
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "CdAiService:update",
        app_msg: "",
      };
      await this.b.serviceErr(req, res, e, i.code);
      await this.b.respond(req, res);
    }
  }
  /**
   *
   * curl test:
   * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "CdAis","c": "CdAi","a": "GetType","dat":{"f_vals": [{"query":{"where": {"cdAiTypeId":100}}}],"token":"08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'
   * @param req
   * @param res
   */
  getCdAiType(req, res) {
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceModel: CdAiTypeModel,
      docName: "CdAiService::getCdAiType$",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    try {
      this.b.read$(req, res, serviceInput).subscribe((r) => {
        // this.logger.logInfo('CdAiService::read$()/r:', r)
        this.b.i.code = "CdAiController::Get";
        const svSess = new SessionService();
        svSess.sessResp.cd_token = req.post.dat.token;
        svSess.sessResp.ttl = svSess.getTtl();
        this.b.setAppState(true, this.b.i, svSess.sessResp);
        this.b.cdResp.data = r;
        this.b.respond(req, res);
      });
    } catch (e) {
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "BaseService:update",
        app_msg: "",
      };
      this.b.serviceErr(req, res, e, i.code);
      this.b.respond(req, res);
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////
  // Fetch all enabled CdAiTypes
  async getCdAiType2(req, res) {
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceInstance: this,
      serviceModel: CdAiTypeModel,
      docName: "CdAiTypeService::getCdAiType2",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    const dbResult = await this.b.read2(req, res, serviceInput);
    this.b.i.code = "CdAiTypeService::getCdAiType2";
    const svSess = new SessionService();
    svSess.sessResp.cd_token = req.post.dat.token;
    svSess.sessResp.ttl = svSess.getTtl();
    this.b.setAppState(true, this.b.i, svSess.sessResp);
    this.b.cdResp.data = dbResult;
    this.b.respond(req, res);
  }
  // Search CdAiTypes with dynamic filtering
  async searchCdAiTypes(req, res) {
    try {
      await this.transformSearchQuery(req, res);
      // const take = 10; // Limit
      // const skip = 0;  // Offset
      const serviceInput = {
        serviceInstance: this,
        serviceModel: CdAiTypeModel,
        docName: "CdAiTypeService::searchCdAiTypes",
        cmd: {
          action: "find",
          query: {
            where: this.arrLikeConditions,
          },
        },
        dSource: 1,
      };
      const dbResult = await this.b.read2(req, res, serviceInput);
      this.b.i.code = "CdAiTypeService::searchCdAiTypes";
      const svSess = new SessionService();
      svSess.sessResp.cd_token = req.post.dat.token;
      svSess.sessResp.ttl = svSess.getTtl();
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = dbResult;
      this.b.respond(req, res);
    } catch (e) {
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "CdAiTypeService::searchCdAiTypes",
        app_msg: "",
      };
      this.b.serviceErr(req, res, e, i.code);
      this.b.respond(req, res);
    }
  }
  async transformSearchQuery(req, res) {
    const q = this.b.getPlQuery(req);
    const tq = QueryTransformer.transformQuery(q);
    const COOP_TYPE_SEARCH_FIELDS = tq.searchFields;
    const searchTerm = tq.searchTerm;
    COOP_TYPE_SEARCH_FIELDS.forEach((field) => {
      this.arrLikeConditions.push({ [field]: Like(`%${searchTerm}%`) });
    });
  }
  // Utility: Generate OR conditions for a search term and fields
  orConditions(searchTerm, fields) {
    return fields.map((field) => ({
      [field]: `%${searchTerm}%`,
    }));
  }
  // Utility: Add additional OR conditions to existing conditions
  addOrConditions(where, extraConditions) {
    return where.map((condition) => ({
      ...condition,
      ...extraConditions,
    }));
  }
  getCdObjTypeCount(req, res) {
    const q = this.b.getQuery(req);
    console.log("CdAiService::getCdObjCount/q:", q);
    const serviceInput = {
      serviceModel: CdAiTypeModel,
      docName: "CdAiService::getCdObjCount$",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    this.b.readCount$(req, res, serviceInput).subscribe((r) => {
      this.b.i.code = "CdAiService::getCdObjTypeCount";
      const svSess = new SessionService();
      svSess.sessResp.cd_token = req.post.dat.token;
      svSess.sessResp.ttl = svSess.getTtl();
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = r;
      this.b.respond(req, res);
    });
  }
  /**
   *
   * @param req
   * @param res
   */
  getCdAiPaged(req, res) {
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceModel: CdAiViewModel,
      docName: "CdAiService::getCdAiPaged$",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    this.b.readCount$(req, res, serviceInput).subscribe((r) => {
      this.b.i.code = "CdAiController::Get";
      const svSess = new SessionService();
      svSess.sessResp.cd_token = req.post.dat.token;
      svSess.sessResp.ttl = svSess.getTtl();
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = r;
      this.b.respond(req, res);
    });
  }
  getCdAiQB(req, res) {
    console.log("CdAiService::getCdAiQB()/1");
    this.b.entityAdapter.registerMappingFromEntity(CdAiViewModel);
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceModel: CdAiViewModel,
      docName: "CdAiService::getCdAiQB",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    this.b.readQB$(req, res, serviceInput).subscribe((r) => {
      this.b.i.code = serviceInput.docName;
      const svSess = new SessionService();
      svSess.sessResp.cd_token = req.post.dat.token;
      svSess.sessResp.ttl = svSess.getTtl();
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = r;
      this.b.respond(req, res);
    });
  }
  getPagedSL(req, res) {
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceModel: CdAiModel,
      docName: "CdAiService::getCdAiPaged",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    this.b.readCountSL$(req, res, serviceInput).subscribe((r) => {
      this.b.i.code = "CdAiService::Get";
      const svSess = new SessionService();
      svSess.sessResp.cd_token = req.post.dat.token;
      svSess.sessResp.ttl = svSess.getTtl();
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = r;
      this.b.connSLClose();
      this.b.respond(req, res);
    });
  }
  getCdAiTypeCount(req, res) {
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceModel: CdAiTypeModel,
      docName: "CdAiService::getCdAiPaged$",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    this.b.readCount$(req, res, serviceInput).subscribe((r) => {
      this.b.i.code = "CdAiController::Get";
      const svSess = new SessionService();
      svSess.sessResp.cd_token = req.post.dat.token;
      svSess.sessResp.ttl = svSess.getTtl();
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = r;
      this.b.respond(req, res);
    });
  }
  delete(req, res) {
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceModel: CdAiModel,
      docName: "CdAiService::delete",
      cmd: {
        action: "delete",
        query: q,
      },
      dSource: 1,
    };
    this.b.delete$(req, res, serviceInput).subscribe((ret) => {
      this.b.cdResp.data = ret;
      this.b.respond(req, res);
    });
  }
  deleteSL(req, res) {
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceModel: CdAiModel,
      docName: "CdAiService::deleteSL",
      cmd: {
        action: "delete",
        query: q,
      },
      dSource: 1,
    };
    this.b.deleteSL$(req, res, serviceInput).subscribe((ret) => {
      this.b.cdResp.data = ret;
      this.b.respond(req, res);
    });
  }
  /**
   * This method is used internally by other methods in data agregation
   * @param req
   * @param res
   * @param q
   * @returns
   */
  async getCdAiI(req, res, q) {
    if (q === null) {
      q = this.b.getQuery(req);
    }
    let serviceModel = new CdAiViewModel();
    const serviceInput = this.b.siGet(q, this);
    serviceInput.serviceModelInstance = serviceModel;
    serviceInput.serviceModel = CdAiViewModel;
    try {
      let respData = await this.b.read(req, res, serviceInput);
      return { data: respData, error: null };
    } catch (e) {
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "BaseService:update",
        app_msg: "",
      };
      return { data: null, error: e };
    }
  }
}
