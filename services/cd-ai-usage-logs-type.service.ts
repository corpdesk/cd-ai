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
    // TODO: implement
  }
  // <<cd:method:constructor:end>>

  // <<cd:method:beforeUpdate:start>>
  private beforeUpdate(q: any): any {
    // TODO: implement
  }
  // <<cd:method:beforeUpdate:end>>

  // <<cd:method:create:start>>
  async create(req: Request, res: Response): Promise<void> {
    // TODO: implement
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
  async getCdAiUsageLogsType(req: Request, res: Response): Promise<void> {
    // TODO: implement
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
  async update(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:update:end>>

  // <<cd:method:delete:start>>
  async delete(req: Request, res: Response): Promise<void> {
    // TODO: implement
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
