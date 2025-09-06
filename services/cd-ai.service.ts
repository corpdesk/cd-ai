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

export class CdAiService {
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
    this.b = new BaseService();
    // this.logger = new Logging();
    this.serviceModel = new CdAiModel();
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
    if (q.update?.CdAiEnabled === "") {
      q.update.CdAiEnabled = null;
    }
    return q;
  }
  // <<cd:method:beforeUpdate:end>>

  // <<cd:method:create:start>>
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
    const results: any[] = [];

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
        const pl: CdAiModel = this.b.getPlData(req);

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
  // <<cd:method:create:end>>

  // <<cd:method:validateCreate:start>>
  async validateCreate(req: Request, res: Response): Promise<void> {
    // TODO: implement
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
  // <<cd:method:getCdAiQB:end>>

  // <<cd:method:getCdAiType:start>>
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
      this.b.err.push((e as Error).toString());
      const i = {
        messages: this.b.err,
        code: "BaseService:update",
        app_msg: "",
      };
      this.b.serviceErr(req, res, e, i.code);
      this.b.respond(req, res);
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
  // <<cd:method:update:end>>

  // <<cd:method:delete:start>>
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
