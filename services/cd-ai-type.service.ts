import { Like } from "typeorm";
import { BaseService } from "../../../sys/base/base.service";
import { ValidationRulesBuilder } from "../../../sys/base/validation-rules-builder";
import { QueryTransformer } from "../../../sys/utils/query-transformer";
import { SessionService } from "../../../sys/user/services/session.service";
import { CdAiTypeModel } from "../models/cdAiType.model";
import { CdAiTypeTypeModel } from "../models/cdAiType-type.model";
import { CdAiTypeViewModel } from "../models/cdAiType-view.model";

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
import { CdAiTypeModel } from "../models/cdAiType.model.js";
import { CdAiTypeTypeModel } from "../models/cdAiType-type.model.js";
import { CdAiTypeViewModel } from "../models/cdAiType-view.model.js";
export class CdAiTypeService {
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
    required: ["cdAiTypeName", "cdAiTypeTypeId"],
    noDuplicate: ["cdAiTypeName", "cdAiTypeTypeId"],
  };
  uRules;
  dRules;
  constructor() {
    this.b = new BaseService();
    // this.logger = new Logging();
    this.serviceModel = new CdAiTypeModel();
  }
  async initSession(req, res) {
    const svSess = new SessionService();
    // this.sessDataExt = await svSess.getSessionDataExt(req, res);
  }
  /**
       * Create from new company:
       *  - Create company, then create cdAiType
       *
       * Create from existing company
       *  - select company then create cdAiType
      * {
         "ctx": "App",
         "m": "CdAiTypes",
         "c": "CdAiType",
         "a": "Create",
         "dat": {
             "f_vals": [
             {
                 "data": {
                     "cdAiTypeGuid":"",
                     "cdAiTypeName": "Benin",
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
      .mustExist("userId", CdAiTypeModel)
      .mustExist("cdAiTypeId", CdAiTypeModel)
      .build();
    const validationCreateParams = {
      controllerInstance: this,
      model: CdAiTypeModel,
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
          cdAiTypeGuid: "GUID",
          cdAiTypeEnabled: true,
          cdAiTypeTypeId: 108,
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
        serviceModel: CdAiTypeModel,
        serviceModelInstance: this.serviceModel,
        docName: "Create CdAiType",
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
          "m": "CdAiTypes",
          "c": "CdAiType",
          "a": "CreateM",
          "dat": {
              "f_vals": [
              {
                  "data": [
                  {
                      "cdAiTypeGuid": "",
                      "cdAiTypeName": "Kenya",
                      "cdAiTypeDescription": "2006",
                      "cdGeoLocationId": null,
                      "cdAiTypeWoccu": false,
                      "cdAiTypeCount": 2993,
                      "cdAiTypeEfgsCount": 3265545,
                      "cdAiTypeSavesShares": 1608009012,
                      "cdAiTypeLoans": 1604043550,
                      "cdAiTypeReserves": 102792479,
                      "cdAiTypeAssets": 2146769999,
                      "cdAiTypeEfgPenetration": 16.01,
                      "cdAiTypeDateLabel": "2006-12-31 23:59:59",
                      "cdAiTypeRefId": null
                  },
                  {
                      "cdAiTypeGuid": "",
                      "cdAiTypeName": "Malawi",
                      "cdAiTypeDescription": "2006",
                      "cdGeoLocationId": null,
                      "cdAiTypeWoccu": false,
                      "cdAiTypeCount": 70,
                      "cdAiTypeEfgsCount": 62736,
                      "cdAiTypeSavesShares": 6175626,
                      "cdAiTypeLoans": 4946246,
                      "cdAiTypeReserves": 601936,
                      "cdAiTypeAssets": 7407250,
                      "cdAiTypeEfgPenetration": 0.9,
                      "cdAiTypeDateLabel": "2006-12-31 23:59:59",
                      "cdAiTypeRefId": null
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
    for (var cdAiTypeData of data) {
      const cdAiTypeQuery = cdAiTypeData;
      const svCdAiType = new CdAiTypeService();
      const si = {
        serviceInstance: svCdAiType,
        serviceModel: CdAiTypeModel,
        serviceModelInstance: svCdAiType.serviceModel,
        docName: "CdAiTypeService::CreateM",
        dSource: 1,
      };
      const createIParams = {
        serviceInput: si,
        controllerData: cdAiTypeQuery,
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
      //     "cdAiTypeName",
      //     "cdAiTypeDescription"
      // ],
      where: {},
      take: 5,
      skip: 0,
    };
    this.getCdAiType(req, res, q);
  }
  async CdAiTypeExists(req, res) {
    const serviceInput = this.b.serviceInputGet(this);
    return this.b.read(req, res, serviceInput);
  }
  async beforeCreateSL(req, res) {
    this.b.setPlData(req, { key: "cdAiTypeGuid", value: this.b.getGuid() });
    this.b.setPlData(req, { key: "cdAiTypeEnabled", value: true });
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
        // this.logger.logInfo('CdAiTypeService::read$()/r:', r)
        this.b.i.code = "CdAiTypeService::Get";
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
        code: "CdAiTypeService:update",
        app_msg: "",
      };
      await this.b.serviceErr(req, res, e, i.code);
      await this.b.respond(req, res);
    }
  }
  update(req, res) {
    // this.logger.logInfo('CdAiTypeService::update()/01');
    let q = this.b.getQuery(req);
    q = this.beforeUpdate(q);
    const serviceInput = {
      serviceModel: CdAiTypeModel,
      docName: "CdAiTypeService::update",
      cmd: {
        action: "update",
        query: q,
      },
      dSource: 1,
    };
    // this.logger.logInfo('CdAiTypeService::update()/02')
    this.b.update$(req, res, serviceInput).subscribe((ret) => {
      this.b.cdResp.data = ret;
      this.b.respond(req, res);
    });
  }
  updateSL(req, res) {
    let q = this.b.getQuery(req);
    q = this.beforeUpdateSL(q);
    const serviceInput = {
      serviceModel: CdAiTypeModel,
      docName: "CdAiTypeService::update",
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
    if (q.update.CdAiTypeEnabled === "") {
      q.update.CdAiTypeEnabled = null;
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
   * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App", "m": "CdAiTypes","c": "CdAiType","a": "Get","dat": {"f_vals": [{"query": {"where": {"cdAiTypeName": "Kenya"}}}],"token":"08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'
   * @param req
   * @param res
   * @param q
   */
  async getCdAiType(req, res, q) {
    if (q === null) {
      q = this.b.getQuery(req);
    }
    // const serviceInput = siGet(q,this)
    this.serviceModel = new CdAiTypeModel();
    const serviceInput = this.b.siGet(q, this);
    serviceInput.serviceModelInstance = this.serviceModel;
    serviceInput.serviceModel = CdAiTypeModel;
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
  async getCdAiTypes(req, res, q) {
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
  async getCdAiTypeSL(req, res) {
    await this.b.initSqlite(req, res);
    const q = this.b.getQuery(req);
    const serviceInput = this.b.serviceInputGet(this);
    try {
      this.b.readSL$(req, res, serviceInput).subscribe((r) => {
        // this.logger.logInfo('CdAiTypeService::read$()/r:', r)
        this.b.i.code = "CdAiTypeService::Get";
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
        code: "CdAiTypeService:update",
        app_msg: "",
      };
      await this.b.serviceErr(req, res, e, i.code);
      await this.b.respond(req, res);
    }
  }
  /**
   *
   * curl test:
   * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "CdAiTypes","c": "CdAiType","a": "GetType","dat":{"f_vals": [{"query":{"where": {"cdAiTypeTypeId":100}}}],"token":"08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'
   * @param req
   * @param res
   */
  getCdAiTypeType(req, res) {
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceModel: CdAiTypeTypeModel,
      docName: "CdAiTypeService::getCdAiTypeType$",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    try {
      this.b.read$(req, res, serviceInput).subscribe((r) => {
        // this.logger.logInfo('CdAiTypeService::read$()/r:', r)
        this.b.i.code = "CdAiTypeController::Get";
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
  // Fetch all enabled CdAiTypeTypes
  async getCdAiTypeType2(req, res) {
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceInstance: this,
      serviceModel: CdAiTypeTypeModel,
      docName: "CdAiTypeTypeService::getCdAiTypeType2",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    const dbResult = await this.b.read2(req, res, serviceInput);
    this.b.i.code = "CdAiTypeTypeService::getCdAiTypeType2";
    const svSess = new SessionService();
    svSess.sessResp.cd_token = req.post.dat.token;
    svSess.sessResp.ttl = svSess.getTtl();
    this.b.setAppState(true, this.b.i, svSess.sessResp);
    this.b.cdResp.data = dbResult;
    this.b.respond(req, res);
  }
  // Search CdAiTypeTypes with dynamic filtering
  async searchCdAiTypeTypes(req, res) {
    try {
      await this.transformSearchQuery(req, res);
      // const take = 10; // Limit
      // const skip = 0;  // Offset
      const serviceInput = {
        serviceInstance: this,
        serviceModel: CdAiTypeTypeModel,
        docName: "CdAiTypeTypeService::searchCdAiTypeTypes",
        cmd: {
          action: "find",
          query: {
            where: this.arrLikeConditions,
          },
        },
        dSource: 1,
      };
      const dbResult = await this.b.read2(req, res, serviceInput);
      this.b.i.code = "CdAiTypeTypeService::searchCdAiTypeTypes";
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
        code: "CdAiTypeTypeService::searchCdAiTypeTypes",
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
    console.log("CdAiTypeService::getCdObjCount/q:", q);
    const serviceInput = {
      serviceModel: CdAiTypeTypeModel,
      docName: "CdAiTypeService::getCdObjCount$",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    this.b.readCount$(req, res, serviceInput).subscribe((r) => {
      this.b.i.code = "CdAiTypeService::getCdObjTypeCount";
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
  getCdAiTypePaged(req, res) {
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceModel: CdAiTypeViewModel,
      docName: "CdAiTypeService::getCdAiTypePaged$",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    this.b.readCount$(req, res, serviceInput).subscribe((r) => {
      this.b.i.code = "CdAiTypeController::Get";
      const svSess = new SessionService();
      svSess.sessResp.cd_token = req.post.dat.token;
      svSess.sessResp.ttl = svSess.getTtl();
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = r;
      this.b.respond(req, res);
    });
  }
  getCdAiTypeQB(req, res) {
    console.log("CdAiTypeService::getCdAiTypeQB()/1");
    this.b.entityAdapter.registerMappingFromEntity(CdAiTypeViewModel);
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceModel: CdAiTypeViewModel,
      docName: "CdAiTypeService::getCdAiTypeQB",
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
      serviceModel: CdAiTypeModel,
      docName: "CdAiTypeService::getCdAiTypePaged",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    this.b.readCountSL$(req, res, serviceInput).subscribe((r) => {
      this.b.i.code = "CdAiTypeService::Get";
      const svSess = new SessionService();
      svSess.sessResp.cd_token = req.post.dat.token;
      svSess.sessResp.ttl = svSess.getTtl();
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = r;
      this.b.connSLClose();
      this.b.respond(req, res);
    });
  }
  getCdAiTypeTypeCount(req, res) {
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceModel: CdAiTypeTypeModel,
      docName: "CdAiTypeService::getCdAiTypePaged$",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    this.b.readCount$(req, res, serviceInput).subscribe((r) => {
      this.b.i.code = "CdAiTypeController::Get";
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
      serviceModel: CdAiTypeModel,
      docName: "CdAiTypeService::delete",
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
      serviceModel: CdAiTypeModel,
      docName: "CdAiTypeService::deleteSL",
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
  async getCdAiTypeI(req, res, q) {
    if (q === null) {
      q = this.b.getQuery(req);
    }
    let serviceModel = new CdAiTypeViewModel();
    const serviceInput = this.b.siGet(q, this);
    serviceInput.serviceModelInstance = serviceModel;
    serviceInput.serviceModel = CdAiTypeViewModel;
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
