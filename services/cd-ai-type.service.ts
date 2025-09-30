import { BaseService } from "../../../sys/base/base.service";
import {
  IQuery,
  IRespInfo,
  ICdRequest,
  IServiceInput,
} from "../../../sys/base/i-base";
import { Logging } from "../../../sys/base/winston.log";
import { ValidationRulesBuilder } from "../../../sys/base/validation-rules-builder";
import { SessionService } from "../../../sys/user/services/session.service";
import { CdAiModel } from "../models/cd-ai.model";
import { CdAiTypeModel } from "../models/cd-ai-type.model";
import { CdAiViewModel } from "../models/cd-ai-view.model";
import { CdAiUsageLogsModel } from "../models/cd-ai-usage-logs.model";
import { CdAiUsageLogsTypeModel } from "../models/cd-ai-usage-logs-type.model";
import { CdAiUsageLogsViewModel } from "../models/cd-ai-usage-logs-view.model";

export class CdAiTypeService {
  logger: Logging;
  b: BaseService;
  cdToken: string;
  uid: number;
  serviceModel: CdAiTypeModel;
  svSess: SessionService;
  validationCreateParams: any;
  cRules: any = { required: ["cdAiTypeName"], noDuplicate: ["cdAiTypeName"] };

  // <<cd:method:constructor:start>>
  constructor() {
    // super()
    this.b = new BaseService();
    this.logger = new Logging();
    this.serviceModel = new CdAiTypeModel();
  }
  // <<cd:method:constructor:end>>

  // <<cd:method:beforeUpdate:start>>
  /**
   * harmonise any data that can
   * result in type error;
   * @param q
   * @returns
   */
  beforeUpdate(q: any) {
    if (q.update.CdAiTypeEnabled === "") {
      q.update.CdAiTypeEnabled = null;
    }
    return q;
  }
  // <<cd:method:beforeUpdate:end>>

  // <<cd:method:create:start>>
  /**
     * {
        "ctx": "App",
        "m": "CdAiTypes",
        "c": "CdAiType",
        "a": "Create",
        "dat": {
            "f_vals": [
            {
                "data": {
                    "cdAiTypeStatGuid":"",
                    "cdAiTypeStatName": "Benin", 
                    "cdAiTypeStatDescription":"2005",
                    "cdGeoLocationId":null,
                    "cdAiTypeWoccu": false,
                    "cdAiTypeCount": null,
                    "cdAiTypeMembersCount": 881232, 
                    "cdAiTypeSavesShares":56429394,
                    "cdAiTypeLoans":45011150,
                    "cdAiTypeReserves":null, 
                    "cdAiTypeAssets": null,
                    "cdAiTypeMemberPenetration":20.95,
                    "cdAiTypeStatDateLabel": "2005-12-31 23:59:59",
                    "cdAiTypeStatRefId":null
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
    const results: any[] = [];

    // Build rules + existence map once
    const { rules, existenceMap } = new ValidationRulesBuilder()
      .require(...this.cRules.required)
      .noDuplicate(...this.cRules.noDuplicate)
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
        const pl: CdAiTypeModel = this.b.getPlData(req);

        await this.b.beforeCreateGeneric(req, {
          cdAiTypeGuid: "GUID",
          cdAiTypeEnabled: true,
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
  // <<cd:method:create:end>>

  // <<cd:method:validateCreate:start>>
  async validateCreate(req: any, res: any) {
    this.logger.logInfo("CdAiTypeCdAiTypeService::validateCreate()/01");
    const svSess = new SessionService();
    ///////////////////////////////////////////////////////////////////
    // 1. Validate against duplication
    const params = {
      controllerInstance: this,
      model: CdAiTypeModel,
    };
    this.b.i.code = "CdAiTypeService::validateCreate";
    let ret = false;
    if (await this.b.validateUnique(req, res, params)) {
      this.logger.logInfo("CdAiTypeCdAiTypeService::validateCreate()/02");
      if (await this.b.validateRequired(req, res, this.cRules)) {
        this.logger.logInfo("CdAiTypeCdAiTypeService::validateCreate()/03");
        ret = true;
      } else {
        this.logger.logInfo("CdAiTypeCdAiTypeService::validateCreate()/04");
        ret = false;
        this.b.i.app_msg = `the required fields ${this.b.isInvalidFields.join(", ")} is missing`;
        this.b.err.push(this.b.i.app_msg);
        this.b.setAppState(false, this.b.i, svSess.sessResp);
      }
    } else {
      this.logger.logInfo("CdAiTypeCdAiTypeService::validateCreate()/05");
      ret = false;
      this.b.i.app_msg = `duplicate for ${this.cRules.noDuplicate.join(", ")} is not allowed`;
      this.b.err.push(this.b.i.app_msg);
      this.b.setAppState(false, this.b.i, svSess.sessResp);
    }
    this.logger.logInfo("CdAiTypeCdAiTypeService::validateCreate()/06");
    ///////////////////////////////////////////////////////////////////
    // 2. confirm the cdAiTypeId referenced exists
    // const pl: CdAiTypeModel = this.b.getPlData(req);
    // if ('cdAiTypeId' in pl) {
    //     this.logger.logInfo('CdAiTypeCdAiTypeService::validateCreate()/07')
    //     this.logger.logInfo('CdAiTypeCdAiTypeService::validateCreate()/pl:', pl)
    //     const serviceInput = {
    //         serviceModel: CdAiTypeModel,
    //         docName: 'CdAiTypeService::validateCreate',
    //         cmd: {
    //             action: 'find',
    //             query: { where: { cdAiTypeId: pl.cdAiTypeId } }
    //         },
    //         dSource: 1
    //     }
    //     this.logger.logInfo('CdAiTypeCdAiTypeService::validateCreate()/serviceInput:', JSON.stringify(serviceInput))
    //     const r: any = await this.b.read(req, res, serviceInput)
    //     this.logger.logInfo('CdAiTypeCdAiTypeService::validateCreate()/r:', r)
    //     if (r.length > 0) {
    //         this.logger.logInfo('CdAiTypeCdAiTypeService::validateCreate()/08')
    //         ret = true;
    //     } else {
    //         this.logger.logInfo('CdAiTypeCdAiTypeService::validateCreate()/10')
    //         ret = false;
    //         this.b.i.app_msg = `CdAiType type reference is invalid`;
    //         this.b.err.push(this.b.i.app_msg);
    //         this.b.setAppState(false, this.b.i, svSess.sessResp);
    //     }
    // } else {
    //     this.logger.logInfo('CdAiTypeCdAiTypeService::validateCreate()/11')
    //     // this.b.i.app_msg = `parentModuleGuid is missing in payload`;
    //     // this.b.err.push(this.b.i.app_msg);
    //     //////////////////
    //     this.b.i.app_msg = `cdAiTypeId is missing in payload`;
    //     this.b.err.push(this.b.i.app_msg);
    //     this.b.setAppState(false, this.b.i, svSess.sessResp);
    // }
    this.logger.logInfo("CdAiTypeService::getCdAiType12");
    if (this.b.err.length > 0) {
      this.logger.logInfo("CdAiTypeCdAiTypeService::validateCreate()/13");
      ret = false;
    }
    return ret;
  }
  // <<cd:method:validateCreate:end>>

  // <<cd:method:cdAiExists:start>>
  async cdAiExists(): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:cdAiExists:end>>

  // <<cd:method:get:start>>
  async get(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:get:end>>

  // <<cd:method:getCount:start>>
  async getCount(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCount:end>>

  // <<cd:method:getPaged:start>>
  async getPaged(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getPaged:end>>

  // <<cd:method:getQB:start>>
  async getQB(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getQB:end>>

  // <<cd:method:getType:start>>
  /**
   *
   * curl test:
   * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "CdAiTypes","c": "CdAiType","a": "GetType","dat":{"f_vals": [{"query":{"where": {"cdAiTypeId":100}}}],"token":"08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'
   * @param req
   * @param res
   */
  getType(req: any, res: any) {
    const q = this.b.getQuery(req);
    this.logger.logInfo("CdAiTypeService::getType:", q);
    const serviceInput = {
      serviceModel: CdAiTypeModel,
      docName: "CdAiTypeService::getType",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    try {
      this.b.read$(req, res, serviceInput).subscribe((r) => {
        // this.logger.logInfo('CdAiTypeService::read$()/r:', r)
        this.b.i.code = "CdAiTypeService::getType";
        const svSess = new SessionService();
        svSess.sessResp.cd_token = req.post.dat.token;
        svSess.sessResp.ttl = svSess.getTtl();
        this.b.setAppState(true, this.b.i, svSess.sessResp);
        this.b.cdResp.data = r;
        this.b.respond(req, res);
      });
    } catch (e) {
      //   this.logger.logInfo('CdAiTypeService::read$()/e:', e);
      this.b.err.push((e as Error).toString());
      const i = {
        messages: this.b.err,
        code: "CdAiTypeService:getType",
        app_msg: "",
      };
      this.b.serviceErr(req, res, e, i.code);
      this.b.respond(req, res);
    }
  }
  // <<cd:method:getType:end>>

  // <<cd:method:getCdAiTypeProfile:start>>
  async getCdAiTypeProfile(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiTypeProfile:end>>

  // <<cd:method:getCdAiTypeProfileByToken:start>>
  async getCdAiTypeProfileByToken(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiTypeProfileByToken:end>>

  // <<cd:method:getScopedCdAiType:start>>
  async getScopedCdAiType(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getScopedCdAiType:end>>

  // <<cd:method:updateCdAiTypeProfile:start>>
  async updateCdAiTypeProfile(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:updateCdAiTypeProfile:end>>

  // <<cd:method:update:start>>
  update(req: any, res: any) {
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
  // <<cd:method:update:end>>

  // <<cd:method:delete:start>>
  delete(req: any, res: any) {
    const q = this.b.getQuery(req);
    this.logger.logInfo("CdAiTypeService::delete()/q:", q);
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
  // <<cd:method:delete:end>>

  // <<cd:method:activateCdAiType:start>>
  async activateCdAiType(): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:activateCdAiType:end>>

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
