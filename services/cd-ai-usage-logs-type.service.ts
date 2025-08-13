import { Like } from "typeorm";
import { Logging } from "../../../sys/base/winston.log.js";
import { BaseService } from "../../../sys/base/base.service.js";
import { SessionService } from "../../../sys/user/services/session.service.js";
import { CdGeoLocationModel } from "../../../../../../cd-geo/models/cd-geo-location.model.js";
import { CompanyModel } from "../../../sys/moduleman/models/company.model.js";
import { CompanyService } from "../../../sys/moduleman/services/company.service.js";
import { QueryTransformer } from "../../../sys/utilities/query-transformer.js";
import { CdGeoLocationService } from "../../../../../../cd-geo/services/cd-geo-location.service.js";
import { CdAiUsageLogsTypeModel } from "../models/cdAiUsageLogsType.model.js";
import { CdAiUsageLogsTypeTypeModel } from "../models/cdAiUsageLogsType-type.model.js";
import { CdAiUsageLogsTypeViewModel } from "../models/cdAiUsageLogsType-view.model.js";
import { CdAiUsageLogsTypeEfgViewModel } from "../models/cdAiUsageLogsType-efg-view.model.js";
import {
  CdAiUsageLogsTypeEfgModel,
  cdAiUsageLogsTypeEfgProfileDefault,
} from "../models/cdAiUsageLogsType-efg.model.js";
// import { QueryTransformer } from '../../../sys/utils/query-transformer';
export class CdAiUsageLogsTypeService {
  logger;
  b; // instance of BaseService
  cdToken;
  srvSess;
  srvUser;
  user;
  serviceModel;
  modelName = "CdAiUsageLogsTypeModel";
  sessModel;
  sessDataExt;
  // moduleModel: ModuleModel;
  arrLikeConditions = [];
  /*
   * create rules
   */
  cRules = {
    required: ["cdAiUsageLogsTypeName", "cdAiUsageLogsTypeTypeId"],
    noDuplicate: ["cdAiUsageLogsTypeName", "cdAiUsageLogsTypeTypeId"],
  };
  uRules;
  dRules;
  constructor() {
    // super();
    this.b = new BaseService();
    this.logger = new Logging();
    this.serviceModel = new CdAiUsageLogsTypeModel();
  }
  async initSession(req, res) {
    const svSess = new SessionService();
    this.sessDataExt = await svSess.getSessionDataExt(req, res);
  }
  /**
       * Create from new company:
       *  - Create company, then create cdAiUsageLogsType
       *
       * Create from existing company
       *  - select company then create cdAiUsageLogsType
      * {
         "ctx": "App",
         "m": "CdAiUsageLogsTypes",
         "c": "CdAiUsageLogsType",
         "a": "Create",
         "dat": {
             "f_vals": [
             {
                 "data": {
                     "cdAiUsageLogsTypeGuid":"",
                     "cdAiUsageLogsTypeName": "Benin",
                     "cdAiUsageLogsTypeDescription":"2005",
                     "cdGeoLocationId":null,
                     "cdAiUsageLogsTypeWoccu": false,
                     "cdAiUsageLogsTypeCount": null,
                     "cdAiUsageLogsTypeEfgsCount": 881232,
                     "cdAiUsageLogsTypeSavesShares":56429394,
                     "cdAiUsageLogsTypeLoans":45011150,
                     "cdAiUsageLogsTypeReserves":null,
                     "cdAiUsageLogsTypeAssets": null,
                     "cdAiUsageLogsTypeEfgPenetration":20.95,
                     "cdAiUsageLogsTypeDateLabel": "2005-12-31 23:59:59",
                     "cdAiUsageLogsTypeRefId":null
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
    this.logger.logInfo("cdAiUsageLogsType/create::validateCreate()/01");
    const svSess = new SessionService();
    if (await this.validateCreate(req, res)) {
      await this.beforeCreate(req, res);
      const serviceInput = {
        serviceModel: CdAiUsageLogsTypeModel,
        modelName: "CdAiUsageLogsTypeModel",
        serviceModelInstance: this.serviceModel,
        docName: "Create CdAiUsageLogsType",
        dSource: 1,
      };
      this.logger.logInfo(
        "CdAiUsageLogsTypeService::create()/serviceInput:",
        serviceInput,
      );
      const respData = await this.b.create(req, res, serviceInput);
      this.b.i.app_msg = "new CdAiUsageLogsType created";
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = await respData;
      const r = await this.b.respond(req, res);
    } else {
      this.logger.logInfo("cdAiUsageLogsType/create::validateCreate()/02");
      const r = await this.b.respond(req, res);
    }
  }
  async validateCreate(req, res) {
    this.logger.logInfo(
      "cdAiUsageLogsType/CdAiUsageLogsTypeService::validateCreate()/01",
    );
    const svSess = new SessionService();
    // const svCompany = new CompanyService();
    let companyParams;
    // const fValItem = req.body.dat.f_vals[0];
    let pl = await this.b.getPlData(req);
    console.log("CdAiUsageLogsTypeService::validateCreate()/pl:", pl);
    // Validation params for the different checks
    const validationParams = [
      {
        field: "cdAiUsageLogsTypeTypeId",
        query: { cdAiUsageLogsTypeTypeId: pl.cdAiUsageLogsTypeTypeId },
        model: CdAiUsageLogsTypeTypeModel,
      },
      {
        field: "cdGeoLocationId",
        query: { cdGeoLocationId: pl.cdGeoLocationId },
        model: CdGeoLocationModel,
      },
    ];
    if ("companyId" in pl) {
      companyParams = {
        field: "companyId",
        query: { companyId: pl.companyId },
        model: CompanyModel,
      };
      validationParams.push(companyParams);
    }
    const valid = await this.validateExistence(req, res, validationParams);
    if (!valid) {
      this.logger.logInfo(
        "cdAiUsageLogsType/CdAiUsageLogsTypeService::validateCreate()/Validation failed",
      );
      this.b.setAppState(false, this.b.i, svSess.sessResp);
      return false;
    }
    // Proceed with further CdAiUsageLogsType-specific validation or creation logic
    this.logger.logInfo(
      "cdAiUsageLogsType/CdAiUsageLogsTypeService::validateCreate()/Validation passed",
    );
    // Other validation logic (e.g., duplicate checks, required field checks, etc.)
    return true;
  }
  async validateExistence(req, res, validationParams) {
    const promises = validationParams.map((param) => {
      const serviceInput = {
        serviceModel: param.model,
        docName: `CdAiUsageLogsTypeService::validateExistence(${param.field})`,
        cmd: {
          action: "find",
          query: { where: param.query },
        },
        dSource: 1,
      };
      console.log(
        "CdAiUsageLogsTypeService::validateExistence/param.model:",
        param.model,
      );
      console.log(
        "CdAiUsageLogsTypeService::validateExistence/serviceInput:",
        JSON.stringify(serviceInput),
      );
      const b = new BaseService();
      return b.read(req, res, serviceInput).then((r) => {
        if (r.length > 0) {
          this.logger.logInfo(
            `cdAiUsageLogsType/CdAiUsageLogsTypeService::validateExistence() - ${param.field} exists`,
          );
          return true;
        } else {
          this.logger.logError(
            `cdAiUsageLogsType/CdAiUsageLogsTypeService::validateExistence() - Invalid ${param.field}`,
          );
          this.b.i.app_msg = `${param.field} reference is invalid`;
          this.b.err.push(this.b.i.app_msg);
          return false;
        }
      });
    });
    const results = await Promise.all(promises);
    // If any of the validations fail, return false
    return results.every((result) => result === true);
  }
  async createSL(req, res) {
    const svSess = new SessionService();
    await this.b.initSqlite(req, res);
    if (await this.validateCreateSL(req, res)) {
      await this.beforeCreateSL(req, res);
      const serviceInput = {
        serviceInstance: this,
        serviceModel: CdAiUsageLogsTypeModel,
        serviceModelInstance: this.serviceModel,
        docName: "Create CdAiUsageLogsType",
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
          "m": "CdAiUsageLogsTypes",
          "c": "CdAiUsageLogsType",
          "a": "CreateM",
          "dat": {
              "f_vals": [
              {
                  "data": [
                  {
                      "cdAiUsageLogsTypeGuid": "",
                      "cdAiUsageLogsTypeName": "Kenya",
                      "cdAiUsageLogsTypeDescription": "2006",
                      "cdGeoLocationId": null,
                      "cdAiUsageLogsTypeWoccu": false,
                      "cdAiUsageLogsTypeCount": 2993,
                      "cdAiUsageLogsTypeEfgsCount": 3265545,
                      "cdAiUsageLogsTypeSavesShares": 1608009012,
                      "cdAiUsageLogsTypeLoans": 1604043550,
                      "cdAiUsageLogsTypeReserves": 102792479,
                      "cdAiUsageLogsTypeAssets": 2146769999,
                      "cdAiUsageLogsTypeEfgPenetration": 16.01,
                      "cdAiUsageLogsTypeDateLabel": "2006-12-31 23:59:59",
                      "cdAiUsageLogsTypeRefId": null
                  },
                  {
                      "cdAiUsageLogsTypeGuid": "",
                      "cdAiUsageLogsTypeName": "Malawi",
                      "cdAiUsageLogsTypeDescription": "2006",
                      "cdGeoLocationId": null,
                      "cdAiUsageLogsTypeWoccu": false,
                      "cdAiUsageLogsTypeCount": 70,
                      "cdAiUsageLogsTypeEfgsCount": 62736,
                      "cdAiUsageLogsTypeSavesShares": 6175626,
                      "cdAiUsageLogsTypeLoans": 4946246,
                      "cdAiUsageLogsTypeReserves": 601936,
                      "cdAiUsageLogsTypeAssets": 7407250,
                      "cdAiUsageLogsTypeEfgPenetration": 0.9,
                      "cdAiUsageLogsTypeDateLabel": "2006-12-31 23:59:59",
                      "cdAiUsageLogsTypeRefId": null
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
    this.logger.logInfo("CdAiUsageLogsTypeService::createM()/01");
    let data = req.post.dat.f_vals[0].data;
    this.logger.logInfo("CdAiUsageLogsTypeService::createM()/data:", data);
    // this.b.models.push(CdAiUsageLogsTypeModel)
    // this.b.init(req, res)
    for (var cdAiUsageLogsTypeData of data) {
      this.logger.logInfo("cdAiUsageLogsTypeData", cdAiUsageLogsTypeData);
      const cdAiUsageLogsTypeQuery = cdAiUsageLogsTypeData;
      const svCdAiUsageLogsType = new CdAiUsageLogsTypeService();
      const si = {
        serviceInstance: svCdAiUsageLogsType,
        serviceModel: CdAiUsageLogsTypeModel,
        serviceModelInstance: svCdAiUsageLogsType.serviceModel,
        docName: "CdAiUsageLogsTypeService::CreateM",
        dSource: 1,
      };
      const createIParams = {
        serviceInput: si,
        controllerData: cdAiUsageLogsTypeQuery,
      };
      let ret = await this.createI(req, res, createIParams);
      this.logger.logInfo("CdAiUsageLogsTypeService::createM()/forLoop/ret:", {
        ret: ret,
      });
    }
    // return current sample data
    // eg first 5
    // this is just a sample for development
    // producation can be tailored to requrement
    // and the query can be set from the client side.
    let q = {
      // "select": [
      //     "cdAiUsageLogsTypeName",
      //     "cdAiUsageLogsTypeDescription"
      // ],
      where: {},
      take: 5,
      skip: 0,
    };
    this.getCdAiUsageLogsType(req, res, q);
  }
  async CdAiUsageLogsTypeExists(req, res, params) {
    const serviceInput = {
      serviceInstance: this,
      serviceModel: CdAiUsageLogsTypeModel,
      docName: "CdAiUsageLogsTypeService::CdAiUsageLogsTypeExists",
      cmd: {
        action: "find",
        query: { where: params.filter },
      },
      dSource: 1,
    };
    return this.b.read(req, res, serviceInput);
  }
  async beforeCreate(req, res) {
    /**
     * create can be processed from existing or new company
     * In case of new company, setCompanyId() saves and use the id to set companyId for cdAiUsageLogsType
     */
    await this.setCompanyId(req, res);
    this.b.setPlData(req, {
      key: "cdAiUsageLogsTypeGuid",
      value: this.b.getGuid(),
    });
    this.b.setPlData(req, { key: "cdAiUsageLogsTypeEnabled", value: true });
    return true;
  }
  async beforeCreateSL(req, res) {
    this.b.setPlData(req, {
      key: "cdAiUsageLogsTypeGuid",
      value: this.b.getGuid(),
    });
    this.b.setPlData(req, { key: "cdAiUsageLogsTypeEnabled", value: true });
    return true;
  }
  async setCompanyId(req, res) {
    const svCompany = new CompanyService();
    if ("extData" in req.post.dat.f_vals[0]) {
      if ("company" in req.post.dat.f_vals[0].extData) {
        const si = {
          serviceInstance: svCompany,
          serviceModel: CompanyModel,
          serviceModelInstance: svCompany.serviceModel,
          docName: "CdAiUsageLogsTypeService/beforeCreate",
          dSource: 1,
        };
        const createIParams = {
          serviceInput: si,
          controllerData: req.post.dat.f_vals[0].extData.company,
        };
        // Call CompanyService to create a new company
        const c = await svCompany.createI(req, res, createIParams);
        this.b.setPlData(req, { key: "companyId", value: c.companyId });
      }
    }
  }
  async read(req, res, serviceInput) {
    // const serviceInput: IServiceInput = {
    //     serviceInstance: this,
    //     serviceModel: CdAiUsageLogsTypeModel,
    //     docName: 'CdAiUsageLogsTypeService::CdAiUsageLogsTypeExists',
    //     cmd: {
    //         action: 'find',
    //         query: { where: params.filter }
    //     },
    //     dSource: 1,
    // }
    return this.b.read(req, res, serviceInput);
  }
  async readSL(req, res, serviceInput) {
    await this.b.initSqlite(req, res);
    const q = this.b.getQuery(req);
    this.logger.logInfo("CdAiUsageLogsTypeService::getCdAiUsageLogsType/q:", q);
    try {
      this.b.readSL$(req, res, serviceInput).subscribe((r) => {
        // this.logger.logInfo('CdAiUsageLogsTypeService::read$()/r:', r)
        this.b.i.code = "CdAiUsageLogsTypeService::Get";
        const svSess = new SessionService();
        svSess.sessResp.cd_token = req.post.dat.token;
        svSess.sessResp.ttl = svSess.getTtl();
        this.b.setAppState(true, this.b.i, svSess.sessResp);
        this.b.cdResp.data = r;
        this.b.connSLClose();
        this.b.respond(req, res);
      });
    } catch (e) {
      //   this.logger.logInfo('CdAiUsageLogsTypeService::read$()/e:', e);
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "CdAiUsageLogsTypeService:update",
        app_msg: "",
      };
      await this.b.serviceErr(req, res, e, i.code);
      await this.b.respond(req, res);
    }
  }
  update(req, res) {
    // this.logger.logInfo('CdAiUsageLogsTypeService::update()/01');
    let q = this.b.getQuery(req);
    q = this.beforeUpdate(q);
    const serviceInput = {
      serviceModel: CdAiUsageLogsTypeModel,
      docName: "CdAiUsageLogsTypeService::update",
      cmd: {
        action: "update",
        query: q,
      },
      dSource: 1,
    };
    // this.logger.logInfo('CdAiUsageLogsTypeService::update()/02')
    this.b.update$(req, res, serviceInput).subscribe((ret) => {
      this.b.cdResp.data = ret;
      this.b.respond(req, res);
    });
  }
  updateSL(req, res) {
    this.logger.logInfo("CdAiUsageLogsTypeService::update()/01");
    let q = this.b.getQuery(req);
    q = this.beforeUpdateSL(q);
    const serviceInput = {
      serviceModel: CdAiUsageLogsTypeModel,
      docName: "CdAiUsageLogsTypeService::update",
      cmd: {
        action: "update",
        query: q,
      },
      dSource: 1,
    };
    this.logger.logInfo("CdAiUsageLogsTypeService::update()/02");
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
    if (q.update.CdAiUsageLogsTypeEnabled === "") {
      q.update.CdAiUsageLogsTypeEnabled = null;
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
   * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App", "m": "CdAiUsageLogsTypes","c": "CdAiUsageLogsType","a": "Get","dat": {"f_vals": [{"query": {"where": {"cdAiUsageLogsTypeName": "Kenya"}}}],"token":"08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'
   * @param req
   * @param res
   * @param q
   */
  async getCdAiUsageLogsType(req, res, q) {
    if (q === null) {
      q = this.b.getQuery(req);
    }
    this.logger.logInfo("CdAiUsageLogsTypeService::getCdAiUsageLogsType/f:", q);
    if (!q) {
      return;
    }
    // const serviceInput = siGet(q,this)
    this.serviceModel = new CdAiUsageLogsTypeModel();
    const serviceInput = this.b.siGet(
      q,
      "CdAiUsageLogsTypeService::getCdAiUsageLogsType",
      CompanyModel,
    );
    serviceInput.serviceModelInstance = this.serviceModel;
    serviceInput.serviceModel = CdAiUsageLogsTypeModel;
    try {
      const r = await this.b.read(req, res, serviceInput);
      this.b.successResponse(req, res, r);
    } catch (e) {
      //   this.logger.logInfo('CdAiUsageLogsTypeService::read$()/e:', e);
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
  async getCdAiUsageLogsTypes(req, res, q) {
    if (q === null) {
      q = this.b.getQuery(req);
    }
    if (!q) {
      return;
    }
    this.logger.logInfo(
      "CdAiUsageLogsTypeService::getCdAiUsageLogsTypes/q:",
      q,
    );
    const serviceInput = this.b.siGet(
      q,
      "CdAiUsageLogsTypeService::getCdAiUsageLogsType",
      CompanyModel,
    );
    try {
      const r = await this.b.read(req, res, serviceInput);
      this.b.successResponse(req, res, r);
    } catch (e) {
      //   this.logger.logInfo('CdAiUsageLogsTypeService::read$()/e:', e);
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
  async getCdAiUsageLogsTypeSL(req, res) {
    await this.b.initSqlite(req, res);
    const q = this.b.getQuery(req);
    this.logger.logInfo("CdAiUsageLogsTypeService::getCdAiUsageLogsType/q:", q);
    if (!q) {
      return;
    }
    const serviceInput = this.b.siGet(
      q,
      "CdAiUsageLogsTypeService::getCdAiUsageLogsType",
      CompanyModel,
    );
    try {
      this.b.readSL$(req, res, serviceInput).subscribe((r) => {
        // this.logger.logInfo('CdAiUsageLogsTypeService::read$()/r:', r)
        this.b.i.code = "CdAiUsageLogsTypeService::Get";
        const svSess = new SessionService();
        svSess.sessResp.cd_token = req.post.dat.token;
        svSess.sessResp.ttl = svSess.getTtl();
        this.b.setAppState(true, this.b.i, svSess.sessResp);
        this.b.cdResp.data = r;
        this.b.connSLClose();
        this.b.respond(req, res);
      });
    } catch (e) {
      //   this.logger.logInfo('CdAiUsageLogsTypeService::read$()/e:', e);
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "CdAiUsageLogsTypeService:update",
        app_msg: "",
      };
      await this.b.serviceErr(req, res, e, i.code);
      await this.b.respond(req, res);
    }
  }
  /**
   *
   * curl test:
   * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "CdAiUsageLogsTypes","c": "CdAiUsageLogsType","a": "GetType","dat":{"f_vals": [{"query":{"where": {"cdAiUsageLogsTypeTypeId":100}}}],"token":"08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'
   * @param req
   * @param res
   */
  getCdAiUsageLogsTypeType(req, res) {
    const q = this.b.getQuery(req);
    this.logger.logInfo("CdAiUsageLogsTypeService::getCdAiUsageLogsType/f:", q);
    const serviceInput = {
      serviceModel: CdAiUsageLogsTypeTypeModel,
      docName: "CdAiUsageLogsTypeService::getCdAiUsageLogsTypeType$",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    try {
      this.b.read$(req, res, serviceInput).subscribe((r) => {
        // this.logger.logInfo('CdAiUsageLogsTypeService::read$()/r:', r)
        this.b.i.code = "CdAiUsageLogsTypeController::Get";
        const svSess = new SessionService();
        svSess.sessResp.cd_token = req.post.dat.token;
        svSess.sessResp.ttl = svSess.getTtl();
        this.b.setAppState(true, this.b.i, svSess.sessResp);
        this.b.cdResp.data = r;
        this.b.respond(req, res);
      });
    } catch (e) {
      //   this.logger.logInfo('CdAiUsageLogsTypeService::read$()/e:', e);
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
  // Fetch all enabled CdAiUsageLogsTypeTypes
  async getCdAiUsageLogsTypeType2(req, res) {
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceInstance: this,
      serviceModel: CdAiUsageLogsTypeTypeModel,
      docName: "CdAiUsageLogsTypeTypeService::getCdAiUsageLogsTypeType2",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    const dbResult = await this.b.read(req, res, serviceInput);
    this.b.i.code = "CdAiUsageLogsTypeTypeService::getCdAiUsageLogsTypeType2";
    const svSess = new SessionService();
    svSess.sessResp.cd_token = req.post.dat.token;
    svSess.sessResp.ttl = svSess.getTtl();
    this.b.setAppState(true, this.b.i, svSess.sessResp);
    this.b.cdResp.data = dbResult;
    this.b.respond(req, res);
  }
  // Search CdAiUsageLogsTypeTypes with dynamic filtering
  async searchCdAiUsageLogsTypeTypes(req, res) {
    try {
      await this.transformSearchQuery(req, res);
      // const take = 10; // Limit
      // const skip = 0;  // Offset
      const serviceInput = {
        serviceInstance: this,
        serviceModel: CdAiUsageLogsTypeTypeModel,
        docName: "CdAiUsageLogsTypeTypeService::searchCdAiUsageLogsTypeTypes",
        cmd: {
          action: "find",
          query: {
            where: this.arrLikeConditions,
          },
        },
        dSource: 1,
      };
      console.log(
        "CdAiUsageLogsTypeTypeService::searchCdAiUsageLogsTypeTypes()/serviceInput.cmd.query:",
        serviceInput.cmd?.query,
      );
      const dbResult = await this.b.read(req, res, serviceInput);
      this.b.i.code =
        "CdAiUsageLogsTypeTypeService::searchCdAiUsageLogsTypeTypes";
      const svSess = new SessionService();
      svSess.sessResp.cd_token = req.post.dat.token;
      svSess.sessResp.ttl = svSess.getTtl();
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = dbResult;
      this.b.respond(req, res);
    } catch (e) {
      //   this.logger.logInfo('CdAiUsageLogsTypeTypeService::searchCdAiUsageLogsTypeTypes()/e:', e);
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "CdAiUsageLogsTypeTypeService::searchCdAiUsageLogsTypeTypes",
        app_msg: "",
      };
      this.b.serviceErr(req, res, e, i.code);
      this.b.respond(req, res);
    }
  }
  async transformSearchQuery(req, res) {
    const q = await this.b.getPlQuery(req);
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
  //////////////////////////////////////////////////////////////////////////////////////////
  getCdObjTypeCount(req, res) {
    const q = this.b.getQuery(req);
    console.log("CdAiUsageLogsTypeService::getCdObjCount/q:", q);
    const serviceInput = {
      serviceModel: CdAiUsageLogsTypeTypeModel,
      docName: "CdAiUsageLogsTypeService::getCdObjCount$",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    this.b.readCount$(req, res, serviceInput).subscribe((r) => {
      this.b.i.code = "CdAiUsageLogsTypeService::getCdObjTypeCount";
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
  getCdAiUsageLogsTypePaged(req, res) {
    const q = this.b.getQuery(req);
    this.logger.logInfo(
      "CdAiUsageLogsTypeService::getCdAiUsageLogsTypePaged/q:",
      q,
    );
    const serviceInput = {
      serviceModel: CdAiUsageLogsTypeViewModel,
      docName: "CdAiUsageLogsTypeService::getCdAiUsageLogsTypePaged$",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    this.b.readCount$(req, res, serviceInput).subscribe((r) => {
      this.b.i.code = "CdAiUsageLogsTypeController::Get";
      const svSess = new SessionService();
      svSess.sessResp.cd_token = req.post.dat.token;
      svSess.sessResp.ttl = svSess.getTtl();
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = r;
      this.b.respond(req, res);
    });
  }
  getCdAiUsageLogsTypeQB(req, res) {
    console.log("CdAiUsageLogsTypeService::getCdAiUsageLogsTypeQB()/1");
    this.b.entityAdapter.registerMappingFromEntity(CdAiUsageLogsTypeViewModel);
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceModel: CdAiUsageLogsTypeViewModel,
      docName: "CdAiUsageLogsTypeService::getCdAiUsageLogsTypeQB",
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
    this.logger.logInfo(
      "CdAiUsageLogsTypeService::getCdAiUsageLogsTypePaged()/q:",
      q,
    );
    const serviceInput = {
      serviceModel: CdAiUsageLogsTypeModel,
      docName: "CdAiUsageLogsTypeService::getCdAiUsageLogsTypePaged",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    this.b.readCountSL$(req, res, serviceInput).subscribe((r) => {
      this.b.i.code = "CdAiUsageLogsTypeService::Get";
      const svSess = new SessionService();
      svSess.sessResp.cd_token = req.post.dat.token;
      svSess.sessResp.ttl = svSess.getTtl();
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = r;
      this.b.connSLClose();
      this.b.respond(req, res);
    });
  }
  getCdAiUsageLogsTypeTypeCount(req, res) {
    const q = this.b.getQuery(req);
    this.logger.logInfo(
      "CdAiUsageLogsTypeService::getCdAiUsageLogsTypePaged/q:",
      q,
    );
    const serviceInput = {
      serviceModel: CdAiUsageLogsTypeTypeModel,
      docName: "CdAiUsageLogsTypeService::getCdAiUsageLogsTypePaged$",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    this.b.readCount$(req, res, serviceInput).subscribe((r) => {
      this.b.i.code = "CdAiUsageLogsTypeController::Get";
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
    this.logger.logInfo("CdAiUsageLogsTypeService::delete()/q:", q);
    const serviceInput = {
      serviceModel: CdAiUsageLogsTypeModel,
      docName: "CdAiUsageLogsTypeService::delete",
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
    this.logger.logInfo("CdAiUsageLogsTypeService::deleteSL()/q:", q);
    const serviceInput = {
      serviceModel: CdAiUsageLogsTypeModel,
      docName: "CdAiUsageLogsTypeService::deleteSL",
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
  async getCdAiUsageLogsTypeI(req, res, q) {
    if (q === null) {
      q = this.b.getQuery(req);
    }
    if (!q) {
      return;
    }
    this.logger.logInfo(
      "CdAiUsageLogsTypeService::getCdAiUsageLogsTypeI/q:",
      q,
    );
    let serviceModel = new CdAiUsageLogsTypeViewModel();
    const serviceInput = this.b.siGet(
      q,
      "CdAiUsageLogsTypeService::getCdAiUsageLogsTypeI",
      CdAiUsageLogsTypeModel,
    );
    serviceInput.serviceModelInstance = serviceModel;
    serviceInput.serviceModel = CdAiUsageLogsTypeViewModel;
    try {
      let respData = await this.b.read(req, res, serviceInput);
      return { data: respData, error: null };
    } catch (e) {
      //   this.logger.logInfo('CdAiUsageLogsTypeService::read()/e:', e);
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "BaseService:update",
        app_msg: "",
      };
      return { data: null, error: e };
    }
  }
  /**
   * get data by geo-location
   * 1. get data from n selected locations
   * 2. list countries queried
   * 3. derive polulation data from geoLocation data
   * @param req
   * @param res
   */
  async StatsByGeoLocation(req, res, q) {
    if (q === null) {
      q = this.b.getQuery(req);
    }
    if (!q) {
      return;
    }
    let svCdGeoLocationService = new CdGeoLocationService();
    let gData = await svCdGeoLocationService.getGeoLocationI(req, res, q);
    // ,"order": {"cdAiUsageLogsTypeDateLabel": "ASC"}
    q.order = { cdAiUsageLogsTypeDateLabel: "ASC" };
    let cData = await this.getCdAiUsageLogsTypeI(req, res, q);
    let ret = {
      geoLocationData: gData.data,
      cdAiUsageLogsTypeData: cData.data,
    };
    this.logger.logInfo(
      "CdAiUsageLogsTypeService::StatsByGeoLocation()/ret:",
      ret,
    );
    this.b.cdResp.data = await ret;
    this.b.respond(req, res);
  }
  async getCdAiUsageLogsTypeEfgI(req, res, q) {
    if (q === null) {
      q = this.b.getQuery(req);
    }
    if (!q) {
      return;
    }
    this.logger.logInfo(
      "CdAiUsageLogsTypeService::getCdAiUsageLogsTypeEfgI/q:",
      q,
    );
    let serviceModel = new CdAiUsageLogsTypeEfgViewModel();
    const serviceInput = this.b.siGet(
      q,
      "CdAiUsageLogsTypeService::getCdAiUsageLogsTypeI",
      CdAiUsageLogsTypeModel,
    );
    serviceInput.serviceModelInstance = serviceModel;
    serviceInput.serviceModel = CdAiUsageLogsTypeEfgViewModel;
    try {
      let respData = await this.b.read(req, res, serviceInput);
      return { data: respData, error: null };
    } catch (e) {
      //   this.logger.logInfo('CdAiUsageLogsTypeService::read()/e:', e);
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "BaseService:update",
        app_msg: "",
      };
      return { data: null, error: e };
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////
  // STARTING MEMBER PROFILE FEATURES
  // Public method to update user member profile (e.g., avatar, bio)
  async updateCurrentMemberProfile(req, res) {
    const svSession = new SessionService();
    try {
      // const session = await svSession.getSession(req, res);
      // const userId = session[0].currentUserId;
      // const pl:CdAiUsageLogsTypeEfgModel = this.b.getPlData(req)
      // const q = {where: {userId: userId,cdAiUsageLogsTypeId: pl.cdAiUsageLogsTypeId}}
      // const cdAiUsageLogsTypeEfg = this.getCdAiUsageLogsTypeEfgI(req, res, q)
      const updatedProfile = await this.b.getPlData(req); // Extract payload data
      // Validate input
      const validProfile = await this.validateProfileData(updatedProfile);
      if (validProfile) {
        // Prepare serviceInput for BaseService methods
        const serviceInput = {
          serviceInstance: this,
          serviceModel: CdAiUsageLogsTypeEfgModel,
          docName: "CdAiUsageLogsTypeEfgService::updateCurrentMemberProfile",
          cmd: {
            query: updatedProfile,
          },
        };
        // Update user member profile using BaseService's updateJSONColumnQB method
        const result = await this.b.updateJSONColumnQB(
          req,
          res,
          serviceInput,
          "user member profile",
          updatedProfile,
        );
        // Respond to API caller
        // return await this.b.respond(req, res, { success: true, data: result });
        this.b.cdResp.data = result;
        return await this.b.respond(req, res);
      } else {
        // return await this.b.respond(req, res, { success: false, message: "Invalid profile data" });
        const e = "Invalid profile data";
        this.logger.logInfo("UserService::read$()/e:", { error: e });
        this.b.err.push(e);
        const i = {
          messages: this.b.err,
          code: "UserService:updateProfile",
          app_msg: "",
        };
        await this.b.serviceErr(req, res, e, i.code);
        await this.b.respond(req, res);
      }
    } catch (e) {
      this.logger.logInfo("UserService::read$()/e:", { error: e });
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "UserService:updateProfile",
        app_msg: "",
      };
      await this.b.serviceErr(req, res, e, i.code);
      await this.b.respond(req, res);
    }
  }
  async getUserProfile(req, res) {
    try {
      const pl = await this.b.getPlData(req);
      const userId = pl.userId;
      // Retrieve the user member profile using an internal method
      const profile = await this.getUserProfileI(req, res, userId);
      // Respond with the retrieved profile data
      this.b.cdResp.data = profile;
      return await this.b.respond(req, res);
    } catch (e) {
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "UserService:getProfile",
        app_msg: "",
      };
      await this.b.serviceErr(req, res, e, i.code);
      await this.b.respond(req, res);
    }
  }
  // Public method to get a user member profile
  async getCurrentMemberProfile(req, res) {
    try {
      const svSession = new SessionService();
      const session = await svSession.getSession(req);
      const userId = session[0].currentUserId;
      console.log("UserServices::getCurrentMemberProfile9)/userId:", userId);
      // Retrieve the user member profile using an internal method
      const profile = await this.getUserProfileI(req, res, userId);
      // Respond with the retrieved profile data
      this.b.cdResp.data = profile;
      return await this.b.respond(req, res);
    } catch (e) {
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "UserService:getProfile",
        app_msg: "",
      };
      await this.b.serviceErr(req, res, e, i.code);
      await this.b.respond(req, res);
    }
  }
  // Internal method to retrieve user member profile
  async getUserProfileI(req, res, cdAiUsageLogsTypeEfgId) {
    try {
      // // Use BaseService to retrieve user member profile
      // const result = await this.b.read(req, res, serviceInput);
      // const user = await this.getCdAiUsageLogsTypeEfgI(userId)
      const q = { where: { cdAiUsageLogsTypeEfgId: cdAiUsageLogsTypeEfgId } };
      const cdAiUsageLogsTypeEfg = await this.getCdAiUsageLogsTypeEfgI(
        req,
        res,
        q,
      );
      if (
        cdAiUsageLogsTypeEfg &&
        cdAiUsageLogsTypeEfg[0].cdAiUsageLogsTypeEfgProfile
      ) {
        let cdAiUsageLogsTypeEfgProfileJSON = JSON.parse(
          cdAiUsageLogsTypeEfg[0].cdAiUsageLogsTypeEfgProfile,
        );
        if ("cdAiUsageLogsTypeEfgData" in cdAiUsageLogsTypeEfgProfileJSON) {
          // profile data is valid
          // update with latest user data
          cdAiUsageLogsTypeEfgProfileJSON[0].cdAiUsageLogsTypeEfgData =
            cdAiUsageLogsTypeEfg;
        } else {
          // profile data is not set, so set it from default
          cdAiUsageLogsTypeEfgProfileJSON = cdAiUsageLogsTypeEfgProfileDefault;
          /**
           * this stage should be modified to
           * filter data based on pwermission setting
           * permission data can further be relied on
           * by the front end for hidden or other features of accessibility
           * to user member profile data.
           * This mechanism can be applied to all corpdesk resources
           */
          cdAiUsageLogsTypeEfgProfileJSON.cdAiUsageLogsTypeEfg.memberData =
            cdAiUsageLogsTypeEfg;
        }
        return cdAiUsageLogsTypeEfgProfileJSON; // Parse the JSON field
      } else {
        return null;
      }
    } catch (e) {
      this.b.err.push(e.toString());
      const i = {
        messages: this.b.err,
        code: "UserService:getProfile",
        app_msg: "",
      };
      await this.b.serviceErr(req, res, e, i.code);
      await this.b.respond(req, res);
    }
  }
  // Internal method to handle profile updates
  async updateUserProfileI(req, res, userId, newProfileData) {
    try {
      // Use BaseService method to handle JSON updates for user member profile field
      const serviceInput = {
        serviceInstance: this,
        serviceModel: CdAiUsageLogsTypeEfgModel,
        docName: "CdAiUsageLogsTypeEfgService::updateUserProfileI",
        cmd: {
          query: newProfileData,
          // query: {
          //     where: { user_id: userId },
          //     update: { user member profile: newProfileData }
          // }
        },
      };
      await this.b.updateJSONColumnQB(
        req,
        res,
        serviceInput,
        "user member profile",
        newProfileData,
      );
      return newProfileData; // Return updated profile
    } catch (e) {
      throw new Error(`Error updating user member profile: ${e.message}`);
    }
  }
  // Helper method to validate profile data
  validateProfileData(profileData) {
    // Example validation for bio length
    if (profileData.bio && profileData.bio.length > 500) {
      return false; // Bio is too long
    }
    return true;
  }
}
