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

export class CdAiUsageLogsTypeService {
  logger: Logging;
  b: BaseService;
  cdToken: string;
  uid: number;
  serviceModel: CdAiUsageLogsTypeModel;
  svSess: SessionService;
  validationCreateParams: any;
  cRules: any = {
    required: ["cdAiUsageLogsTypeName"],
    noDuplicate: ["cdAiUsageLogsTypeName"],
  };

  // <<cd:method:constructor:start>>
  constructor() {
    // super()
    this.b = new BaseService();
    this.logger = new Logging();
    this.serviceModel = new CdAiUsageLogsTypeModel();
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
      model: CdAiUsageLogsTypeModel,
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
        const pl: CdAiUsageLogsTypeModel = this.b.getPlData(req);

        await this.b.beforeCreateGeneric(req, {
          cdAiUsageLogsTypeGuid: "GUID",
          cdAiUsageLogsTypeEnabled: true,
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
  // <<cd:method:create:end>>

  // <<cd:method:validateCreate:start>>
  async validateCreate(req: any, res: any) {
    this.logger.logInfo(
      "CdAiUsageLogsTypeCdAiUsageLogsTypeService::validateCreate()/01",
    );
    const svSess = new SessionService();
    ///////////////////////////////////////////////////////////////////
    // 1. Validate against duplication
    const params = {
      controllerInstance: this,
      model: CdAiUsageLogsTypeModel,
    };
    this.b.i.code = "CdAiUsageLogsTypeService::validateCreate";
    let ret = false;
    if (await this.b.validateUnique(req, res, params)) {
      this.logger.logInfo(
        "CdAiUsageLogsTypeCdAiUsageLogsTypeService::validateCreate()/02",
      );
      if (await this.b.validateRequired(req, res, this.cRules)) {
        this.logger.logInfo(
          "CdAiUsageLogsTypeCdAiUsageLogsTypeService::validateCreate()/03",
        );
        ret = true;
      } else {
        this.logger.logInfo(
          "CdAiUsageLogsTypeCdAiUsageLogsTypeService::validateCreate()/04",
        );
        ret = false;
        this.b.i.app_msg = `the required fields ${this.b.isInvalidFields.join(", ")} is missing`;
        this.b.err.push(this.b.i.app_msg);
        this.b.setAppState(false, this.b.i, svSess.sessResp);
      }
    } else {
      this.logger.logInfo(
        "CdAiUsageLogsTypeCdAiUsageLogsTypeService::validateCreate()/05",
      );
      ret = false;
      this.b.i.app_msg = `duplicate for ${this.cRules.noDuplicate.join(", ")} is not allowed`;
      this.b.err.push(this.b.i.app_msg);
      this.b.setAppState(false, this.b.i, svSess.sessResp);
    }
    this.logger.logInfo(
      "CdAiUsageLogsTypeCdAiUsageLogsTypeService::validateCreate()/06",
    );
    ///////////////////////////////////////////////////////////////////
    // 2. confirm the cdAiUsageLogsTypeId referenced exists
    // const pl: CdAiUsageLogsTypeModel = this.b.getPlData(req);
    // if ('cdAiUsageLogsTypeId' in pl) {
    //     this.logger.logInfo('CdAiUsageLogsTypeCdAiUsageLogsTypeService::validateCreate()/07')
    //     this.logger.logInfo('CdAiUsageLogsTypeCdAiUsageLogsTypeService::validateCreate()/pl:', pl)
    //     const serviceInput = {
    //         serviceModel: CdAiUsageLogsTypeModel,
    //         docName: 'CdAiUsageLogsTypeService::validateCreate',
    //         cmd: {
    //             action: 'find',
    //             query: { where: { cdAiUsageLogsTypeId: pl.cdAiUsageLogsTypeId } }
    //         },
    //         dSource: 1
    //     }
    //     this.logger.logInfo('CdAiUsageLogsTypeCdAiUsageLogsTypeService::validateCreate()/serviceInput:', JSON.stringify(serviceInput))
    //     const r: any = await this.b.read(req, res, serviceInput)
    //     this.logger.logInfo('CdAiUsageLogsTypeCdAiUsageLogsTypeService::validateCreate()/r:', r)
    //     if (r.length > 0) {
    //         this.logger.logInfo('CdAiUsageLogsTypeCdAiUsageLogsTypeService::validateCreate()/08')
    //         ret = true;
    //     } else {
    //         this.logger.logInfo('CdAiUsageLogsTypeCdAiUsageLogsTypeService::validateCreate()/10')
    //         ret = false;
    //         this.b.i.app_msg = `CdAiUsageLogsType type reference is invalid`;
    //         this.b.err.push(this.b.i.app_msg);
    //         this.b.setAppState(false, this.b.i, svSess.sessResp);
    //     }
    // } else {
    //     this.logger.logInfo('CdAiUsageLogsTypeCdAiUsageLogsTypeService::validateCreate()/11')
    //     // this.b.i.app_msg = `parentModuleGuid is missing in payload`;
    //     // this.b.err.push(this.b.i.app_msg);
    //     //////////////////
    //     this.b.i.app_msg = `cdAiUsageLogsTypeId is missing in payload`;
    //     this.b.err.push(this.b.i.app_msg);
    //     this.b.setAppState(false, this.b.i, svSess.sessResp);
    // }
    this.logger.logInfo("CdAiUsageLogsTypeService::getCdAiUsageLogsType12");
    if (this.b.err.length > 0) {
      this.logger.logInfo(
        "CdAiUsageLogsTypeCdAiUsageLogsTypeService::validateCreate()/13",
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

  // <<cd:method:getQB:start>>
  async getQB(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getQB:end>>

  // <<cd:method:getType:start>>
  async getType(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getType:end>>

  // <<cd:method:getCdAiUsageLogsTypeProfile:start>>
  async getCdAiUsageLogsTypeProfile(
    req: Request,
    res: Response,
  ): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiUsageLogsTypeProfile:end>>

  // <<cd:method:getCdAiUsageLogsTypeProfileByToken:start>>
  async getCdAiUsageLogsTypeProfileByToken(
    req: Request,
    res: Response,
  ): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiUsageLogsTypeProfileByToken:end>>

  // <<cd:method:getScopedCdAiUsageLogsType:start>>
  async getScopedCdAiUsageLogsType(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getScopedCdAiUsageLogsType:end>>

  // <<cd:method:updateCdAiUsageLogsTypeProfile:start>>
  async updateCdAiUsageLogsTypeProfile(
    req: Request,
    res: Response,
  ): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:updateCdAiUsageLogsTypeProfile:end>>

  // <<cd:method:update:start>>
  update(req: any, res: any) {
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
  // <<cd:method:update:end>>

  // <<cd:method:delete:start>>
  delete(req: any, res: any) {
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
