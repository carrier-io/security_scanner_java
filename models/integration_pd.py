from typing import Optional, List
from pylon.core.tools import log
from pydantic import BaseModel, validator


class IntegrationModel(BaseModel):
    composition_analysis: Optional[bool] = False
    artifact_analysis: Optional[bool] = False
    scan_path: Optional[str] = '/tmp/code'
    scan_opts: Optional[str]
    # save_intermediates_to: Optional[str] = '/data/intermediates/sast'
    timeout: Optional[int]
    timeout_threshold: Optional[int]

    def check_connection(self) -> bool:
        try:
            return True
        except Exception as e:
            log.exception(e)
            return False
