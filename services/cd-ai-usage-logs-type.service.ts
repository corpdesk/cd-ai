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

export class CdAiUsageLogsTypeService {
  logger: Logging;
  b: BaseService;
  cdToken: string;
  uid: number;
  serviceModel: CdAiUsageLogsModel;
  svSess: SessionService;
  validationCreateParams: any;
  cRules: any = {
    required: ["cdAiUsageLogsName", "cdAiUsageLogsTypeId"],
    noDuplicate: ["cdAiUsageLogsName", "cdAiUsageLogsTypeId"],
  };

  // <<cd:method:constructor:start>>
  constructor() {
    // super()
    this.b = new BaseService();
    this.logger = new Logging();
    this.serviceModel = new CdAiUsageLogsTypeTypeModel();
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
    if (q.update.CdAiUsageLogsTypeEnabled === "") {
      q.update.CdAiUsageLogsTypeEnabled = null;
    }
    return q;
  }
  // <<cd:method:beforeUpdate:end>>

  // <<cd:method:create:start>>
  /**
     * {
        "ctx": "App",
        "m": "CdAiUsageLogsTypes",
        "c": "CdAiUsageLogsType",
        "a": "Create",
        "dat": {
            "f_vals": [
            {
                "data": {
                    "cdAiUsageLogsTypeStatGuid":"",
                    "cdAiUsageLogsTypeStatName": "Benin", 
                    "cdAiUsageLogsTypeStatDescription":"2005",
                    "cdGeoLocationId":null,
                    "cdAiUsageLogsTypeWoccu": false,
                    "cdAiUsageLogsTypeCount": null,
                    "cdAiUsageLogsTypeMembersCount": 881232, 
                    "cdAiUsageLogsTypeSavesShares":56429394,
                    "cdAiUsageLogsTypeLoans":45011150,
                    "cdAiUsageLogsTypeReserves":null, 
                    "cdAiUsageLogsTypeAssets": null,
                    "cdAiUsageLogsTypeMemberPenetration":20.95,
                    "cdAiUsageLogsTypeStatDateLabel": "2005-12-31 23:59:59",
                    "cdAiUsageLogsTypeStatRefId":null
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
    this.logger.logInfo("CdAiUsageLogsTypeTypecreate::validateCreate()/01");

    const svSess = new SessionService();
    if (await this.validateCreate(req, res)) {
      await this.beforeCreate(req, res);
      const serviceInput = {
        serviceModel: CdAiUsageLogsTypeTypeModel,
        modelName: "CdAiUsageLogsTypeTypeModel",
        serviceModelInstance: this.serviceModel,
        docName: "Create CdAiUsageLogsType",
        dSource: 1,
      };
      this.logger.logInfo(
        "CdAiUsageLogsTypeTypeService::create()/serviceInput:",
        serviceInput,
      );
      const respData = await this.b.create(req, res, serviceInput);
      this.b.i.app_msg = "new CdAiUsageLogsType created";
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = await respData;
      const r = await this.b.respond(req, res);
    } else {
      this.logger.logInfo("CdAiUsageLogsTypeTypecreate::validateCreate()/02");
      const r = await this.b.respond(req, res);
    }
  }
  // <<cd:method:create:end>>

  // <<cd:method:validateCreate:start>>
  async validateCreate(req: any, res: any) {
    this.logger.logInfo(
      "CdAiUsageLogsTypeTypeCdAiUsageLogsTypeTypeService::validateCreate()/01",
    );
    const svSess = new SessionService();
    ///////////////////////////////////////////////////////////////////
    // 1. Validate against duplication
    const params = {
      controllerInstance: this,
      model: CdAiUsageLogsTypeTypeModel,
    };
    this.b.i.code = "CdAiUsageLogsTypeTypeService::validateCreate";
    let ret = false;
    if (await this.b.validateUnique(req, res, params)) {
      this.logger.logInfo(
        "CdAiUsageLogsTypeTypeCdAiUsageLogsTypeTypeService::validateCreate()/02",
      );
      if (await this.b.validateRequired(req, res, this.cRules)) {
        this.logger.logInfo(
          "CdAiUsageLogsTypeTypeCdAiUsageLogsTypeTypeService::validateCreate()/03",
        );
        ret = true;
      } else {
        this.logger.logInfo(
          "CdAiUsageLogsTypeTypeCdAiUsageLogsTypeTypeService::validateCreate()/04",
        );
        ret = false;
        this.b.i.app_msg = `the required fields ${this.b.isInvalidFields.join(", ")} is missing`;
        this.b.err.push(this.b.i.app_msg);
        this.b.setAppState(false, this.b.i, svSess.sessResp);
      }
    } else {
      this.logger.logInfo(
        "CdAiUsageLogsTypeTypeCdAiUsageLogsTypeTypeService::validateCreate()/05",
      );
      ret = false;
      this.b.i.app_msg = `duplicate for ${this.cRules.noDuplicate.join(", ")} is not allowed`;
      this.b.err.push(this.b.i.app_msg);
      this.b.setAppState(false, this.b.i, svSess.sessResp);
    }
    this.logger.logInfo(
      "CdAiUsageLogsTypeTypeCdAiUsageLogsTypeTypeService::validateCreate()/06",
    );
    ///////////////////////////////////////////////////////////////////
    // 2. confirm the cdAiUsageLogsTypeTypeId referenced exists
    // const pl: CdAiUsageLogsTypeTypeModel = this.b.getPlData(req);
    // if ('cdAiUsageLogsTypeTypeId' in pl) {
    //     this.logger.logInfo('CdAiUsageLogsTypeTypeCdAiUsageLogsTypeTypeService::validateCreate()/07')
    //     this.logger.logInfo('CdAiUsageLogsTypeTypeCdAiUsageLogsTypeTypeService::validateCreate()/pl:', pl)
    //     const serviceInput = {
    //         serviceModel: CdAiUsageLogsTypeTypeModel,
    //         docName: 'CdAiUsageLogsTypeTypeService::validateCreate',
    //         cmd: {
    //             action: 'find',
    //             query: { where: { cdAiUsageLogsTypeTypeId: pl.cdAiUsageLogsTypeTypeId } }
    //         },
    //         dSource: 1
    //     }
    //     this.logger.logInfo('CdAiUsageLogsTypeTypeCdAiUsageLogsTypeTypeService::validateCreate()/serviceInput:', JSON.stringify(serviceInput))
    //     const r: any = await this.b.read(req, res, serviceInput)
    //     this.logger.logInfo('CdAiUsageLogsTypeTypeCdAiUsageLogsTypeTypeService::validateCreate()/r:', r)
    //     if (r.length > 0) {
    //         this.logger.logInfo('CdAiUsageLogsTypeTypeCdAiUsageLogsTypeTypeService::validateCreate()/08')
    //         ret = true;
    //     } else {
    //         this.logger.logInfo('CdAiUsageLogsTypeTypeCdAiUsageLogsTypeTypeService::validateCreate()/10')
    //         ret = false;
    //         this.b.i.app_msg = `CdAiUsageLogsType type reference is invalid`;
    //         this.b.err.push(this.b.i.app_msg);
    //         this.b.setAppState(false, this.b.i, svSess.sessResp);
    //     }
    // } else {
    //     this.logger.logInfo('CdAiUsageLogsTypeTypeCdAiUsageLogsTypeTypeService::validateCreate()/11')
    //     // this.b.i.app_msg = `parentModuleGuid is missing in payload`;
    //     // this.b.err.push(this.b.i.app_msg);
    //     //////////////////
    //     this.b.i.app_msg = `cdAiUsageLogsTypeTypeId is missing in payload`;
    //     this.b.err.push(this.b.i.app_msg);
    //     this.b.setAppState(false, this.b.i, svSess.sessResp);
    // }
    this.logger.logInfo(
      "CdAiUsageLogsTypeTypeService::getCdAiUsageLogsTypeType12",
    );
    if (this.b.err.length > 0) {
      this.logger.logInfo(
        "CdAiUsageLogsTypeTypeCdAiUsageLogsTypeTypeService::validateCreate()/13",
      );
      ret = false;
    }
    return ret;
  }
  // <<cd:method:validateCreate:end>>

  // <<cd:method:cdAiUsageLogsExists:start>>
  async cdAiUsageLogsExists(): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:cdAiUsageLogsExists:end>>

  // <<cd:method:getCdAiUsageLogsCount:start>>
  async getCdAiUsageLogsCount(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiUsageLogsCount:end>>

  // <<cd:method:getCdAiUsageLogsQB:start>>
  async getCdAiUsageLogsQB(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiUsageLogsQB:end>>

  // <<cd:method:getCdAiUsageLogsType:start>>
  /**
   *
   * curl test:
   * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App", "m": "CdAiUsageLogsTypes","c": "CdAiUsageLogsType","a": "Get","dat": {"f_vals": [{"query": {"where": {"cdAiUsageLogsTypeStatName": "Kenya"}}}],"token":"08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'
   * @param req
   * @param res
   * @param q
   */
  async getCdAiUsageLogsType(req, res, q?: IQuery): Promise<any> {
    if (q === null) {
      q = this.b.getQuery(req);
    }
    this.logger.logInfo(
      "CdAiUsageLogsTypeTypeService::getCdAiUsageLogsTypeTypef:",
      q,
    );
    const serviceInput = this.b.siGet(
      q,
      "CdAiUsageLogsTypeTypeService::getCdAiUsageLogsTypeTypef",
      CdAiUsageLogsTypeTypeModel,
    );
    try {
      const r = await this.b.read(req, res, serviceInput);
      this.b.successResponse(req, res, r);
    } catch (e) {
      //   this.logger.logInfo('CdAiUsageLogsTypeTypeService::read$()/e:', e);
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
  // <<cd:method:getCdAiUsageLogsType:end>>

  // <<cd:method:getCdAiUsageLogsProfile:start>>
  async getCdAiUsageLogsProfile(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiUsageLogsProfile:end>>

  // <<cd:method:getCdAiUsageLogsProfileByToken:start>>
  async getCdAiUsageLogsProfileByToken(
    req: Request,
    res: Response,
  ): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiUsageLogsProfileByToken:end>>

  // <<cd:method:getScopedCdAiUsageLogs:start>>
  async getScopedCdAiUsageLogs(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getScopedCdAiUsageLogs:end>>

  // <<cd:method:updateCdAiUsageLogsProfile:start>>
  async updateCdAiUsageLogsProfile(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:updateCdAiUsageLogsProfile:end>>

  // <<cd:method:update:start>>
  update(req: any, res: any) {
    // this.logger.logInfo('CdAiUsageLogsTypeTypeService::update()/01');
    let q = this.b.getQuery(req);
    q = this.beforeUpdate(q);
    const serviceInput = {
      serviceModel: CdAiUsageLogsTypeTypeModel,
      docName: "CdAiUsageLogsTypeTypeService::update",
      cmd: {
        action: "update",
        query: q,
      },
      dSource: 1,
    };
    // this.logger.logInfo('CdAiUsageLogsTypeTypeService::update()/02')
    this.b.update$(req, res, serviceInput).subscribe((ret) => {
      this.b.cdResp.data = ret;
      this.b.respond(req, res);
    });
  }
  // <<cd:method:update:end>>

  // <<cd:method:delete:start>>
  delete(req: any, res: any) {
    const q = this.b.getQuery(req);
    this.logger.logInfo("CdAiUsageLogsTypeTypeService::delete()/q:", q);
    const serviceInput = {
      serviceModel: CdAiUsageLogsTypeTypeModel,
      docName: "CdAiUsageLogsTypeTypeService::delete",
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
