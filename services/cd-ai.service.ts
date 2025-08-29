/**
     * Create from new company:
     *  - Create company, then create abcd
     * 
     * Create from existing company
     *  - select company then create abcd
    * {
       "ctx": "App",
       "m": "cd-ais",
       "c": "cd-ai",
       "a": "Create",
       "dat": {
           "f_vals": [
           {
               "data": {
                   "abcdGuid":"",
                   "abcdName": "Benin", 
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
      .mustExist("userId", cd-aiModel)
      .mustExist("abcdId", cd-aiModel)
      .build();

    const validationCreateParams = {
      controllerInstance: this,
      model: cd-aiModel,
    };

    for (let fVal of fValsArray) {
      req.body.dat.f_vals = [fVal];

      if (
        await this.b.validateCreateGeneric(
          req,
          res,
          rules,
          existenceMap,
          validationCreateParams
        )
      ) {
        // Success path
        const pl: cd-aiModel = this.b.getPlData(req);

        await this.b.beforeCreateGeneric(req, {
          abcdGuid: "GUID",
          abcdEnabled: true,
          abcdTypeId: 108,
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

      async validateCreate(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for validateCreate
      }
    

      async cdAiExists(): Promise<void> {
        // TODO: implement service logic for cdAiExists
      }
    

      async getCdAiCount(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for getCdAiCount
      }
    
update(req, res) {
    // this.logger.logInfo('cd-aiService::update()/01');
    let q = this.b.getQuery(req);
    q = this.beforeUpdate(q);
    const serviceInput = {
      serviceModel: cd-aiModel,
      docName: "cd-aiService::update",
      cmd: {
        action: "update",
        query: q,
      },
      dSource: 1,
    };
    // this.logger.logInfo('cd-aiService::update()/02')
    this.b.update$(req, res, serviceInput).subscribe((ret) => {
      this.b.cdResp.data = ret;
      this.b.respond(req, res);
    });
  }
delete(req, res) {
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceModel: cd-aiModel,
      docName: "cd-aiService::delete",
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

      async getCdAiProfile(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for getCdAiProfile
      }
    

      async getCdAiProfileByToken(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for getCdAiProfileByToken
      }
    

      async getScopedCdAi(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for getScopedCdAi
      }
    

      async updateCdAiProfile(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for updateCdAiProfile
      }
    

      async activateCdAi(): Promise<void> {
        // TODO: implement service logic for activateCdAi
      }
    

      async PromptQuery(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for PromptQuery
      }
    

      async CheckTokenBalance(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for CheckTokenBalance
      }
    

      async GetUserProfile(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for GetUserProfile
      }
    