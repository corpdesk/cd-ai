import { BaseService } from "../../../sys/base/base.service";
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
  serviceModel: CdAiModel;
  svSess: SessionService;
  validationCreateParams: any;
  cRules: any = {
    required: ["cdAiName", "cdAiTypeId"],
    noDuplicate: ["cdAiName", "cdAiTypeId"],
  };

  // <<cd:method:constructor:start>>
  constructor() {
    // super()
    this.b = new BaseService();
    this.logger = new Logging();
    this.serviceModel = new CdAiTypeTypeModel();
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
  async create(req: any, res: any) {
    this.logger.logInfo("CdAiTypeTypecreate::validateCreate()/01");

    const svSess = new SessionService();
    if (await this.validateCreate(req, res)) {
      await this.beforeCreate(req, res);
      const serviceInput = {
        serviceModel: CdAiTypeTypeModel,
        modelName: "CdAiTypeTypeModel",
        serviceModelInstance: this.serviceModel,
        docName: "Create CdAiType",
        dSource: 1,
      };
      this.logger.logInfo(
        "CdAiTypeTypeService::create()/serviceInput:",
        serviceInput,
      );
      const respData = await this.b.create(req, res, serviceInput);
      this.b.i.app_msg = "new CdAiType created";
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = await respData;
      const r = await this.b.respond(req, res);
    } else {
      this.logger.logInfo("CdAiTypeTypecreate::validateCreate()/02");
      const r = await this.b.respond(req, res);
    }
  }
  // <<cd:method:create:end>>

  // <<cd:method:validateCreate:start>>
  async validateCreate(req: any, res: any) {
    this.logger.logInfo("CdAiTypeTypeCdAiTypeTypeService::validateCreate()/01");
    const svSess = new SessionService();
    ///////////////////////////////////////////////////////////////////
    // 1. Validate against duplication
    const params = {
      controllerInstance: this,
      model: CdAiTypeTypeModel,
    };
    this.b.i.code = "CdAiTypeTypeService::validateCreate";
    let ret = false;
    if (await this.b.validateUnique(req, res, params)) {
      this.logger.logInfo(
        "CdAiTypeTypeCdAiTypeTypeService::validateCreate()/02",
      );
      if (await this.b.validateRequired(req, res, this.cRules)) {
        this.logger.logInfo(
          "CdAiTypeTypeCdAiTypeTypeService::validateCreate()/03",
        );
        ret = true;
      } else {
        this.logger.logInfo(
          "CdAiTypeTypeCdAiTypeTypeService::validateCreate()/04",
        );
        ret = false;
        this.b.i.app_msg = `the required fields ${this.b.isInvalidFields.join(", ")} is missing`;
        this.b.err.push(this.b.i.app_msg);
        this.b.setAppState(false, this.b.i, svSess.sessResp);
      }
    } else {
      this.logger.logInfo(
        "CdAiTypeTypeCdAiTypeTypeService::validateCreate()/05",
      );
      ret = false;
      this.b.i.app_msg = `duplicate for ${this.cRules.noDuplicate.join(", ")} is not allowed`;
      this.b.err.push(this.b.i.app_msg);
      this.b.setAppState(false, this.b.i, svSess.sessResp);
    }
    this.logger.logInfo("CdAiTypeTypeCdAiTypeTypeService::validateCreate()/06");
    ///////////////////////////////////////////////////////////////////
    // 2. confirm the cdAiTypeTypeId referenced exists
    // const pl: CdAiTypeTypeModel = this.b.getPlData(req);
    // if ('cdAiTypeTypeId' in pl) {
    //     this.logger.logInfo('CdAiTypeTypeCdAiTypeTypeService::validateCreate()/07')
    //     this.logger.logInfo('CdAiTypeTypeCdAiTypeTypeService::validateCreate()/pl:', pl)
    //     const serviceInput = {
    //         serviceModel: CdAiTypeTypeModel,
    //         docName: 'CdAiTypeTypeService::validateCreate',
    //         cmd: {
    //             action: 'find',
    //             query: { where: { cdAiTypeTypeId: pl.cdAiTypeTypeId } }
    //         },
    //         dSource: 1
    //     }
    //     this.logger.logInfo('CdAiTypeTypeCdAiTypeTypeService::validateCreate()/serviceInput:', JSON.stringify(serviceInput))
    //     const r: any = await this.b.read(req, res, serviceInput)
    //     this.logger.logInfo('CdAiTypeTypeCdAiTypeTypeService::validateCreate()/r:', r)
    //     if (r.length > 0) {
    //         this.logger.logInfo('CdAiTypeTypeCdAiTypeTypeService::validateCreate()/08')
    //         ret = true;
    //     } else {
    //         this.logger.logInfo('CdAiTypeTypeCdAiTypeTypeService::validateCreate()/10')
    //         ret = false;
    //         this.b.i.app_msg = `CdAiType type reference is invalid`;
    //         this.b.err.push(this.b.i.app_msg);
    //         this.b.setAppState(false, this.b.i, svSess.sessResp);
    //     }
    // } else {
    //     this.logger.logInfo('CdAiTypeTypeCdAiTypeTypeService::validateCreate()/11')
    //     // this.b.i.app_msg = `parentModuleGuid is missing in payload`;
    //     // this.b.err.push(this.b.i.app_msg);
    //     //////////////////
    //     this.b.i.app_msg = `cdAiTypeTypeId is missing in payload`;
    //     this.b.err.push(this.b.i.app_msg);
    //     this.b.setAppState(false, this.b.i, svSess.sessResp);
    // }
    this.logger.logInfo("CdAiTypeTypeService::getCdAiTypeType12");
    if (this.b.err.length > 0) {
      this.logger.logInfo(
        "CdAiTypeTypeCdAiTypeTypeService::validateCreate()/13",
      );
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

  // <<cd:method:getCdAiCount:start>>
  async getCdAiCount(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiCount:end>>

  // <<cd:method:getCdAiQB:start>>
  async getCdAiQB(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiQB:end>>

  // <<cd:method:getCdAiType:start>>
  /**
   *
   * curl test:
   * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App", "m": "CdAiTypes","c": "CdAiType","a": "Get","dat": {"f_vals": [{"query": {"where": {"cdAiTypeStatName": "Kenya"}}}],"token":"08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'
   * @param req
   * @param res
   * @param q
   */
  async getCdAiType(req, res, q?: IQuery): Promise<any> {
    if (q === null) {
      q = this.b.getQuery(req);
    }
    this.logger.logInfo("CdAiTypeTypeService::getCdAiTypeTypef:", q);
    const serviceInput = this.b.siGet(
      q,
      "CdAiTypeTypeService::getCdAiTypeTypef",
      CdAiTypeTypeModel,
    );
    try {
      const r = await this.b.read(req, res, serviceInput);
      this.b.successResponse(req, res, r);
    } catch (e) {
      //   this.logger.logInfo('CdAiTypeTypeService::read$()/e:', e);
      this.b.err.push((e as Error).toString());
      const i = {
        messages: this.b.err,
        code: "BaseService:update",
        app_msg: "",
      };
      await this.b.serviceErr(req, res, e, i.code);
      await this.b.respond(req, res);
    }
  }
  // <<cd:method:getCdAiType:end>>

  // <<cd:method:getCdAiProfile:start>>
  async getCdAiProfile(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiProfile:end>>

  // <<cd:method:getCdAiProfileByToken:start>>
  async getCdAiProfileByToken(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiProfileByToken:end>>

  // <<cd:method:getScopedCdAi:start>>
  async getScopedCdAi(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getScopedCdAi:end>>

  // <<cd:method:updateCdAiProfile:start>>
  async updateCdAiProfile(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:updateCdAiProfile:end>>

  // <<cd:method:update:start>>
  update(req: any, res: any) {
    // this.logger.logInfo('CdAiTypeTypeService::update()/01');
    let q = this.b.getQuery(req);
    q = this.beforeUpdate(q);
    const serviceInput = {
      serviceModel: CdAiTypeTypeModel,
      docName: "CdAiTypeTypeService::update",
      cmd: {
        action: "update",
        query: q,
      },
      dSource: 1,
    };
    // this.logger.logInfo('CdAiTypeTypeService::update()/02')
    this.b.update$(req, res, serviceInput).subscribe((ret) => {
      this.b.cdResp.data = ret;
      this.b.respond(req, res);
    });
  }
  // <<cd:method:update:end>>

  // <<cd:method:delete:start>>
  delete(req: any, res: any) {
    const q = this.b.getQuery(req);
    this.logger.logInfo("CdAiTypeTypeService::delete()/q:", q);
    const serviceInput = {
      serviceModel: CdAiTypeTypeModel,
      docName: "CdAiTypeTypeService::delete",
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

  // <<cd:method:activateCdAi:start>>
  async activateCdAi(): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:activateCdAi:end>>

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
