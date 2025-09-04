import { BaseService } from '../../../sys/base/base.service';
import { CdAiService } from '../services/cd-ai.service';
import { CdAiTypeService } from '../services/cd-ai-type.service';
import { CdAiUsageLogsService } from '../services/cd-ai-usage-logs.service';
import { CdAiUsageLogsTypeService } from '../services/cd-ai-usage-logs-type.service';

export class CdAiUsageLogsTypeController {
  
  private b: BaseService;
  
  private svCdAiUsageLogs: CdAiUsageLogsService;
  
  private svCdAiUsageLogsType: CdAiUsageLogsTypeService;

  // <<cd:method:constructor:start>>
  constructor() {
    // TODO: implement
  }
  // <<cd:method:constructor:end>>

  // <<cd:method:Create:start>>
  async Create(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:Create:end>>

  // <<cd:method:GetCdAiUsageLogs:start>>
  async GetCdAiUsageLogs(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:GetCdAiUsageLogs:end>>

  // <<cd:method:GetCdAiUsageLogsType:start>>
  async GetCdAiUsageLogsType(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:GetCdAiUsageLogsType:end>>

  // <<cd:method:GetCount:start>>
  async GetCount(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:GetCount:end>>

  // <<cd:method:Update:start>>
  async Update(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:Update:end>>

  // <<cd:method:Delete:start>>
  async Delete(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:Delete:end>>

  // <<cd:method:LogUsage:start>>
  async LogUsage(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:LogUsage:end>>

  // <<cd:method:GetUsageSummary:start>>
  async GetUsageSummary(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:GetUsageSummary:end>>
}