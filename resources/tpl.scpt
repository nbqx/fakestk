tell application "{{{app_name}}}"
  activate
  with timeout of (1 * 60 * 60) seconds
    {{{run_script}}}
  end timeout
end tell