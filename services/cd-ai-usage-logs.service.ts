import { BaseService } from '../../../sys/base/base.service';
import { CdAiModel } from '../models/cd-ai.model.ts.model';
import { CdAiTypeModel } from '../models/cd-ai-type.model.ts.model';
import { CdAiUsageLogsModel } from '../models/cd-ai-usage-logs.model.ts.model';
import { CdAiUsageLogsTypeModel } from '../models/cd-ai-usage-logs-type.model.ts.model';

export class CdAiUsageLogsService {
  logger: Logging;
  b: BaseService;
  cdToken: string;
  uid: number;
  serviceModel: CdAiUsageLogsModel;
  svSess: SessionService;
  validationCreateParams: any;
  cRules: object;

  // <<cd:method:constructor:start>>
constructor() {
    this.b = new BaseService();
    // this.logger = new Logging();
    this.serviceModel = new CdAiUsageLogsModel();
  }
// <<cd:method:constructor:end>>

  async create(data: any): Promise<any> {
    // TODO: implement create logic
    return data;
  }

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

  // <<cd:method:getCdAiUsageLogsCount:start>>
  async getCdAiUsageLogsCount(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiUsageLogsCount:end>>

  // <<cd:method:getCdAiUsageLogsQB:start>>
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
// <<cd:method:getCdAiUsageLogsQB:end>>

  // <<cd:method:getCdAiUsageLogsType:start>>
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
// <<cd:method:getCdAiUsageLogsType:end>>

  // <<cd:method:getCdAiUsageLogsProfile:start>>
  async getCdAiUsageLogsProfile(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiUsageLogsProfile:end>>

  // <<cd:method:getCdAiUsageLogsProfileByToken:start>>
  async getCdAiUsageLogsProfileByToken(req: Request, res: Response): Promise<void> {
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

  async update(id: string, data: any): Promise<any> {
    // TODO: implement update logic
    return data;
  }

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