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
import { CdAiUsageLogsModel } from "../models/cdAiUsageLogs.model.js";
import { CdAiUsageLogsTypeModel } from "../models/cdAiUsageLogs-type.model.js";
import { CdAiUsageLogsViewModel } from "../models/cdAiUsageLogs-view.model.js";
export class CdAiUsageLogsService {
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
    required: ["cdAiUsageLogsName", "cdAiUsageLogsTypeId"],
    noDuplicate: ["cdAiUsageLogsName", "cdAiUsageLogsTypeId"],
  };
  uRules;
  dRules;
  constructor() {
    this.b = new BaseService();
    // this.logger = new Logging();
    this.serviceModel = new CdAiUsageLogsModel();
  }
  async initSession(req, res) {
    const svSess = new SessionService();
    // this.sessDataExt = await svSess.getSessionDataExt(req, res);
  }
  /**
       * Create from new company:
       *  - Create company, then create cdAiUsageLogs
       *
       * Create from existing company
       *  - select company then create cdAiUsageLogs
      * {
         "ctx": "App",
         "m": "CdAiUsageLogss",
         "c": "CdAiUsageLogs",
         "a": "Create",
         "dat": {
             "f_vals": [
             {
                 "data": {
                     "cdAiUsageLogsGuid":"",
                     "cdAiUsageLogsName": "Benin",
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
      .mustExist("userId", CdAiUsageLogsModel)
      .mustExist("cdAiUsageLogsId", CdAiUsageLogsModel)
      .build();
    const validationCreateParams = {
      controllerInstance: this,
      model: CdAiUsageLogsModel,
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
          cdAiUsageLogsGuid: "GUID",
          cdAiUsageLogsEnabled: true,
          cdAiUsageLogsTypeId: 108,
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
        serviceModel: CdAiUsageLogsModel,
        serviceModelInstance: this.serviceModel,
        docName: "Create CdAiUsageLogs",
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
          "m": "CdAiUsageLogss",
          "c": "CdAiUsageLogs",
          "a": "CreateM",
          "dat": {
              "f_vals": [
              {
                  "data": [
                  {
                      "cdAiUsageLogsGuid": "",
                      "cdAiUsageLogsName": "Kenya",
                      "cdAiUsageLogsDescription": "2006",
                      "cdGeoLocationId": null,
                      "cdAiUsageLogsWoccu": false,
                      "cdAiUsageLogsCount": 2993,
                      "cdAiUsageLogsEfgsCount": 3265545,
                      "cdAiUsageLogsSavesShares": 1608009012,
                      "cdAiUsageLogsLoans": 1604043550,
                      "cdAiUsageLogsReserves": 102792479,
                      "cdAiUsageLogsAssets": 2146769999,
                      "cdAiUsageLogsEfgPenetration": 16.01,
                      "cdAiUsageLogsDateLabel": "2006-12-31 23:59:59",
                      "cdAiUsageLogsRefId": null
                  },
                  {
                      "cdAiUsageLogsGuid": "",
                      "cdAiUsageLogsName": "Malawi",
                      "cdAiUsageLogsDescription": "2006",
                      "cdGeoLocationId": null,
                      "cdAiUsageLogsWoccu": false,
                      "cdAiUsageLogsCount": 70,
                      "cdAiUsageLogsEfgsCount": 62736,
                      "cdAiUsageLogsSavesShares": 6175626,
                      "cdAiUsageLogsLoans": 4946246,
                      "cdAiUsageLogsReserves": 601936,
                      "cdAiUsageLogsAssets": 7407250,
                      "cdAiUsageLogsEfgPenetration": 0.9,
                      "cdAiUsageLogsDateLabel": "2006-12-31 23:59:59",
                      "cdAiUsageLogsRefId": null
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
    for (var cdAiUsageLogsData of data) {
      const cdAiUsageLogsQuery = cdAiUsageLogsData;
      const svCdAiUsageLogs = new CdAiUsageLogsService();
      const si = {
        serviceInstance: svCdAiUsageLogs,
        serviceModel: CdAiUsageLogsModel,
        serviceModelInstance: svCdAiUsageLogs.serviceModel,
        docName: "CdAiUsageLogsService::CreateM",
        dSource: 1,
      };
      const createIParams = {
        serviceInput: si,
        controllerData: cdAiUsageLogsQuery,
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
      //     "cdAiUsageLogsName",
      //     "cdAiUsageLogsDescription"
      // ],
      where: {},
      take: 5,
      skip: 0,
    };
    this.getCdAiUsageLogs(req, res, q);
  }
  async CdAiUsageLogsExists(req, res) {
    const serviceInput = this.b.serviceInputGet(this);
    return this.b.read(req, res, serviceInput);
  }
  async beforeCreateSL(req, res) {
    this.b.setPlData(req, {
      key: "cdAiUsageLogsGuid",
      value: this.b.getGuid(),
    });
    this.b.setPlData(req, { key: "cdAiUsageLogsEnabled", value: true });
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
        // this.logger.logInfo('CdAiUsageLogsService::read$()/r:', r)
        this.b.i.code = "CdAiUsageLogsService::Get";
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
        code: "CdAiUsageLogsService:update",
        app_msg: "",
      };
      await this.b.serviceErr(req, res, e, i.code);
      await this.b.respond(req, res);
    }
  }
  update(req, res) {
    // this.logger.logInfo('CdAiUsageLogsService::update()/01');
    let q = this.b.getQuery(req);
    q = this.beforeUpdate(q);
    const serviceInput = {
      serviceModel: CdAiUsageLogsModel,
      docName: "CdAiUsageLogsService::update",
      cmd: {
        action: "update",
        query: q,
      },
      dSource: 1,
    };
    // this.logger.logInfo('CdAiUsageLogsService::update()/02')
    this.b.update$(req, res, serviceInput).subscribe((ret) => {
      this.b.cdResp.data = ret;
      this.b.respond(req, res);
    });
  }
  updateSL(req, res) {
    let q = this.b.getQuery(req);
    q = this.beforeUpdateSL(q);
    const serviceInput = {
      serviceModel: CdAiUsageLogsModel,
      docName: "CdAiUsageLogsService::update",
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
    if (q.update.CdAiUsageLogsEnabled === "") {
      q.update.CdAiUsageLogsEnabled = null;
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
   * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App", "m": "CdAiUsageLogss","c": "CdAiUsageLogs","a": "Get","dat": {"f_vals": [{"query": {"where": {"cdAiUsageLogsName": "Kenya"}}}],"token":"08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'
   * @param req
   * @param res
   * @param q
   */
  async getCdAiUsageLogs(req, res, q) {
    if (q === null) {
      q = this.b.getQuery(req);
    }
    // const serviceInput = siGet(q,this)
    this.serviceModel = new CdAiUsageLogsModel();
    const serviceInput = this.b.siGet(q, this);
    serviceInput.serviceModelInstance = this.serviceModel;
    serviceInput.serviceModel = CdAiUsageLogsModel;
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
  async getCdAiUsageLogss(req, res, q) {
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
  async getCdAiUsageLogsSL(req, res) {
    await this.b.initSqlite(req, res);
    const q = this.b.getQuery(req);
    const serviceInput = this.b.serviceInputGet(this);
    try {
      this.b.readSL$(req, res, serviceInput).subscribe((r) => {
        // this.logger.logInfo('CdAiUsageLogsService::read$()/r:', r)
        this.b.i.code = "CdAiUsageLogsService::Get";
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
        code: "CdAiUsageLogsService:update",
        app_msg: "",
      };
      await this.b.serviceErr(req, res, e, i.code);
      await this.b.respond(req, res);
    }
  }
  /**
   *
   * curl test:
   * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "CdAiUsageLogss","c": "CdAiUsageLogs","a": "GetType","dat":{"f_vals": [{"query":{"where": {"cdAiUsageLogsTypeId":100}}}],"token":"08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'
   * @param req
   * @param res
   */
  getCdAiUsageLogsType(req, res) {
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceModel: CdAiUsageLogsTypeModel,
      docName: "CdAiUsageLogsService::getCdAiUsageLogsType$",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    try {
      this.b.read$(req, res, serviceInput).subscribe((r) => {
        // this.logger.logInfo('CdAiUsageLogsService::read$()/r:', r)
        this.b.i.code = "CdAiUsageLogsController::Get";
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
  // Fetch all enabled CdAiUsageLogsTypes
  async getCdAiUsageLogsType2(req, res) {
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceInstance: this,
      serviceModel: CdAiUsageLogsTypeModel,
      docName: "CdAiUsageLogsTypeService::getCdAiUsageLogsType2",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    const dbResult = await this.b.read2(req, res, serviceInput);
    this.b.i.code = "CdAiUsageLogsTypeService::getCdAiUsageLogsType2";
    const svSess = new SessionService();
    svSess.sessResp.cd_token = req.post.dat.token;
    svSess.sessResp.ttl = svSess.getTtl();
    this.b.setAppState(true, this.b.i, svSess.sessResp);
    this.b.cdResp.data = dbResult;
    this.b.respond(req, res);
  }
  // Search CdAiUsageLogsTypes with dynamic filtering
  async searchCdAiUsageLogsTypes(req, res) {
    try {
      await this.transformSearchQuery(req, res);
      // const take = 10; // Limit
      // const skip = 0;  // Offset
      const serviceInput = {
        serviceInstance: this,
        serviceModel: CdAiUsageLogsTypeModel,
        docName: "CdAiUsageLogsTypeService::searchCdAiUsageLogsTypes",
        cmd: {
          action: "find",
          query: {
            where: this.arrLikeConditions,
          },
        },
        dSource: 1,
      };
      const dbResult = await this.b.read2(req, res, serviceInput);
      this.b.i.code = "CdAiUsageLogsTypeService::searchCdAiUsageLogsTypes";
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
        code: "CdAiUsageLogsTypeService::searchCdAiUsageLogsTypes",
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
    console.log("CdAiUsageLogsService::getCdObjCount/q:", q);
    const serviceInput = {
      serviceModel: CdAiUsageLogsTypeModel,
      docName: "CdAiUsageLogsService::getCdObjCount$",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    this.b.readCount$(req, res, serviceInput).subscribe((r) => {
      this.b.i.code = "CdAiUsageLogsService::getCdObjTypeCount";
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
  getCdAiUsageLogsPaged(req, res) {
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceModel: CdAiUsageLogsViewModel,
      docName: "CdAiUsageLogsService::getCdAiUsageLogsPaged$",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    this.b.readCount$(req, res, serviceInput).subscribe((r) => {
      this.b.i.code = "CdAiUsageLogsController::Get";
      const svSess = new SessionService();
      svSess.sessResp.cd_token = req.post.dat.token;
      svSess.sessResp.ttl = svSess.getTtl();
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = r;
      this.b.respond(req, res);
    });
  }
  getCdAiUsageLogsQB(req, res) {
    console.log("CdAiUsageLogsService::getCdAiUsageLogsQB()/1");
    this.b.entityAdapter.registerMappingFromEntity(CdAiUsageLogsViewModel);
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceModel: CdAiUsageLogsViewModel,
      docName: "CdAiUsageLogsService::getCdAiUsageLogsQB",
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
      serviceModel: CdAiUsageLogsModel,
      docName: "CdAiUsageLogsService::getCdAiUsageLogsPaged",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    this.b.readCountSL$(req, res, serviceInput).subscribe((r) => {
      this.b.i.code = "CdAiUsageLogsService::Get";
      const svSess = new SessionService();
      svSess.sessResp.cd_token = req.post.dat.token;
      svSess.sessResp.ttl = svSess.getTtl();
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = r;
      this.b.connSLClose();
      this.b.respond(req, res);
    });
  }
  getCdAiUsageLogsTypeCount(req, res) {
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceModel: CdAiUsageLogsTypeModel,
      docName: "CdAiUsageLogsService::getCdAiUsageLogsPaged$",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    this.b.readCount$(req, res, serviceInput).subscribe((r) => {
      this.b.i.code = "CdAiUsageLogsController::Get";
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
      serviceModel: CdAiUsageLogsModel,
      docName: "CdAiUsageLogsService::delete",
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
      serviceModel: CdAiUsageLogsModel,
      docName: "CdAiUsageLogsService::deleteSL",
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
  async getCdAiUsageLogsI(req, res, q) {
    if (q === null) {
      q = this.b.getQuery(req);
    }
    let serviceModel = new CdAiUsageLogsViewModel();
    const serviceInput = this.b.siGet(q, this);
    serviceInput.serviceModelInstance = serviceModel;
    serviceInput.serviceModel = CdAiUsageLogsViewModel;
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
