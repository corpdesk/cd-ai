import { BaseService } from '../../../sys/base/base.service';
import { CdAiService } from '../services/cd-ai.service';
import { CdAiTypeService } from '../services/cd-ai-type.service';
import { CdAiUsageLogsService } from '../services/cd-ai-usage-logs.service';
import { CdAiUsageLogsTypeService } from '../services/cd-ai-usage-logs-type.service';

export class CdAiTypeController {
  
  private b: BaseService;
  
  private svCdAi: CdAiService;
  
  private svCdAiType: CdAiTypeService;

  constructor() {
    // TODO: initialize controller
  }

  // <cd:method name="constructor">
  constructor(b: BaseService, svCdAi: CdAiService) {
    // TODO: implement
  }
  // </cd:method>

  // <cd:method name="create">
  async create(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // </cd:method>

  // <cd:method name="getCdAi">
  async getCdAi(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // </cd:method>

  // <cd:method name="getCdAiType">
  async getCdAiType(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // </cd:method>

  // <cd:method name="getCount">
  async getCount(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // </cd:method>

  // <cd:method name="update">
  async update(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // </cd:method>

  // <cd:method name="delete">
  async delete(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // </cd:method>

  // <cd:method name="promptQuery">
  async promptQuery(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // </cd:method>

  // <cd:method name="checkTokenBalance">
  async checkTokenBalance(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // </cd:method>

  // <cd:method name="getUserProfile">
  async getUserProfile(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // </cd:method>
}