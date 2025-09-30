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

export class CdAiUsageLogsService {
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
    this.b = new BaseService();
    this.logger = new Logging();
    this.serviceModel = new CdAiUsageLogsModel();
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
    if (q.update?.CdAiUsageLogsEnabled === "") {
      q.update.CdAiUsageLogsEnabled = null;
    }
    return q;
  }
  // <<cd:method:beforeUpdate:end>>

  // <<cd:method:create:start>>
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
    const results: any[] = [];

    // Build rules + existence map once
    const { rules, existenceMap } = new ValidationRulesBuilder()
      .require(...this.cRules.required)
      .noDuplicate(...this.cRules.noDuplicate)
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
        const pl: CdAiUsageLogsModel = this.b.getPlData(req);

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
  // <<cd:method:create:end>>

  // <<cd:method:validateCreate:start>>
  async validateCreate(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:validateCreate:end>>

  // <<cd:method:cdAiUsageLogsExists:start>>
  async cdAiUsageLogsExists(): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:cdAiUsageLogsExists:end>>

  // <<cd:method:get:start>>
  /**
   *
   * curl test:
   * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App", "m": "CdAiUsageLogss","c": "CdAiUsageLogs","a": "Get","dat": {"f_vals": [{"query": {"where": {"cdAiUsageLogsName": "Kenya"}}}],"token":"08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'
   * @param req
   * @param res
   * @param q
   */
  async get(req, res, q?: IQuery): Promise<any> {
    if (q === null) {
      q = this.b.getQuery(req);
    }
    // const serviceInput = siGet(q,this)
    this.serviceModel = new CdAiUsageLogsModel();
    const serviceInput: IServiceInput<CdAiUsageLogsModel> =
      this.b.serviceInputGet(
        q,
        `CdAiUsageLogsService:getCdAiUsageLogs`,
        CdAiUsageLogsModel,
      );
    serviceInput.serviceModelInstance = this.serviceModel;
    serviceInput.serviceModel = CdAiUsageLogsModel;
    try {
      const r = await this.b.read(req, res, serviceInput);
      this.b.successResponse(req, res, r);
    } catch (e) {
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
  // <<cd:method:get:end>>

  // <<cd:method:getCount:start>>
  getCount(req, res) {
    const q = this.b.getQuery(req);
    console.log("CdAiUsageLogsService::getCount/q:", q);
    const serviceInput = {
      serviceModel: CdAiUsageLogsModel,
      docName: "CdAiUsageLogsService::getCount$",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    this.b.readCount$(req, res, serviceInput).subscribe((r) => {
      this.b.i.code = "CdAiUsageLogsService::getCount";
      const svSess = new SessionService();
      svSess.sessResp.cd_token = req.post.dat.token;
      svSess.sessResp.ttl = svSess.getTtl();
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = r;
      this.b.respond(req, res);
    });
  }
  // <<cd:method:getCount:end>>

  // <<cd:method:getQB:start>>
  getQB(req, res) {
    this.b.entityAdapter.registerMappingFromEntity(CdAiUsageLogsViewModel);
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceModel: CdAiUsageLogsViewModel,
      docName: "CdAiUsageLogsService::getQB",
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
  // <<cd:method:getQB:end>>

  // <<cd:method:getType:start>>
  /**
   *
   * curl test:
   * curl -k -X POST -H 'Content-Type: application/json' -d '{"ctx": "App","m": "CdAiUsageLogss","c": "CdAiUsageLogs","a": "GetType","dat":{"f_vals": [{"query":{"where": {"cdAiUsageLogsTypeId":100}}}],"token":"08f45393-c10e-4edd-af2c-bae1746247a1"},"args": null}' http://localhost:3001 -v  | jq '.'
   * @param req
   * @param res
   */
  getType(req, res) {
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceModel: CdAiUsageLogsTypeModel,
      docName: "CdAiUsageLogsService::getType",
      cmd: {
        action: "find",
        query: q,
      },
      dSource: 1,
    };
    try {
      this.b.read$(req, res, serviceInput).subscribe((r) => {
        // this.logger.logInfo('CdAiUsageLogsService::read$()/r:', r)
        this.b.i.code = "CdAiUsageLogsController::getType";
        const svSess = new SessionService();
        svSess.sessResp.cd_token = req.post.dat.token;
        svSess.sessResp.ttl = svSess.getTtl();
        this.b.setAppState(true, this.b.i, svSess.sessResp);
        this.b.cdResp.data = r;
        this.b.respond(req, res);
      });
    } catch (e) {
      this.b.err.push((e as Error).toString());
      const i = {
        messages: this.b.err,
        code: "CdAiUsageLogsController:getType",
        app_msg: "",
      };
      this.b.serviceErr(req, res, e, i.code);
      this.b.respond(req, res);
    }
  }
  // <<cd:method:getType:end>>

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
  // <<cd:method:update:end>>

  // <<cd:method:delete:start>>
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
