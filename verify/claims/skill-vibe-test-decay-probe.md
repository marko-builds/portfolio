# claims: skill-vibe-test-decay-probe

Ledger for `src/content/blog/skill-vibe-test-decay-probe.mdx`. One row per checkable line; rows are
`- STATUS | date | evidence | span` and the span is re-resolved against the post on every lint run.
Locators are relative to the monolith root unless they start with `cmd:`. Written 2026-08-24 by
opening every artifact named below in that run; nothing here is from memory.

Artifacts opened: `projects/skill-vibe-test/src/skill_vibe_test/{conversation,cli,planner,judge,
llm,workspace,chart,report,fillers}.py`, `projects/skill-vibe-test/skill-vibe-report/report.md`,
both `transcripts/conversation-{1,2}.json` (read with python3), `projects/skill-vibe-test/.gitignore`,
`gh repo view marko-builds/skill-vibe-test`, the portfolio git log for the post, and
`decisions/log.md:3439-3459`.

## Frontmatter

- VERIFIED | 2026-08-24 | cmd: python3 -c 'import json; d=json.load(open("projects/skill-vibe-test/skill-vibe-report/transcripts/conversation-1.json")); print([(t["turn"], len(t["tool_calls"])) for t in d["transcript"]])' (turn 6 has 0 calls; turn 1 has 14 including scripts/capabilities-health.py; conversation-2 ran the script at turn 6, hence the "one of the two conversations" scope) | in one of the two conversations, by turn 6 the agent had stopped running the script the skill prescribes
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/src/skill_vibe_test/conversation.py:213-222 | the first run was thrown out by the gate I had written into it

## Body

- VERIFIED | 2026-08-24 | projects/skill-vibe-test/skill-vibe-report/report.md:67-69 | run this script first, never edit that file, append the log in this exact format
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/skill-vibe-report/report.md:5 | pointed it at one of my own skills, and I got two answers
- VERIFIED | 2026-08-24 | cmd: git -C projects/portfolio log --format='%h %ad %s' --date=short -- src/content/blog/skill-vibe-test-decay-probe.mdx (first write 8aa389e 2026-07-07, rewrite c2dd6a9 2026-08-09) | which took me a month to go back and find
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/src/skill_vibe_test/conversation.py:5-13 | scripted 10-turn conversation with a real agent, driven headlessly through session resumption
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/src/skill_vibe_test/fillers.py:10-24 | several hundred words each of deliberately unrelated content (refrigeration cycles, trip planning, photosynthesis)
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/src/skill_vibe_test/conversation.py:36 | Turns 6, 8, and 10 probe again with skill-relevant tasks
- VERIFIED | 2026-08-24 | cmd: python3 -c 'import json; d=json.load(open("projects/skill-vibe-test/skill-vibe-report/transcripts/conversation-1.json")); print([(p["turn"], p["context_tokens"]) for p in d["probes"]])' (31925, 37990, 39384, 40979) | Turn 1 is the baseline probe at 31,925 context tokens
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/src/skill_vibe_test/fillers.py:11-23 | fillers about refrigeration, a lighthouse keeper story, a trip through Japan and the metric system
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/src/skill_vibe_test/planner.py:1-30 | extracts an observable-behavior rubric from the skill: five to eight checkable criteria
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/src/skill_vibe_test/judge.py:10-39 | scores each probe against that rubric using the tool-call trace
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/src/skill_vibe_test/judge.py:32-38 | Each verdict also carries an escape-hatch flag, for the distinct failure
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/src/skill_vibe_test/conversation.py:213-222 | The baseline is a gate. If the skill cannot steer a fresh, undiluted context
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/skill-vibe-report/report.md:1-8 | Two conversations against Sonnet, judged by Sonnet, $1.77 of API spend
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/skill-vibe-report/report.md:14-33 | Both baselines, both turn 6s, both turn 8s, both turn 10s. Eight out of eight.
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/skill-vibe-report/report.md:16-33 | replaced the existing line in my decision log instead of appending a new one
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/skill-vibe-report/report.md:30 | read a whole skill file where the procedure says to read only the frontmatter
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/skill-vibe-report/report.md:17-32 | the judge flagged four of them as escape hatches
- VERIFIED | 2026-08-24 | cmd: git -C projects/portfolio log --format='%h %ad %s' --date=short -- src/content/blog/skill-vibe-test-decay-probe.mdx (8aa389e 2026-07-07 to c2dd6a9 2026-08-09; run artifacts dated 2026-07-02) | Going back to the transcripts a month later, three things were wrong with that
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/skill-vibe-report/report.md:14-33 | Eight failures out of eight is a flat line at FAIL
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/skill-vibe-test-decay-probe/decay-flatline.svg | Here is that run, redrawn from its saved transcripts
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/skill-vibe-report/report.md:14-33 | Both lines sit flat on the FAIL axis at every probe point
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/src/skill_vibe_test/chart.py:69-77 | Chart titled "skill-vibe-test: does capabilities-health still steer sonnet as context fills?"
- VERIFIED | 2026-08-24 | cmd: git -C projects/skill-vibe-test log --format='%h %ad %s' --date=short -S'GATE BYPASSED' -- src (44129c1 2026-08-09; skill-vibe-report/decay.png dated 2026-07-02) | The original chart carried no such warning
- VERIFIED | 2026-08-24 | cmd: python3 -c 'import json; print([json.load(open(f"projects/skill-vibe-test/skill-vibe-report/transcripts/conversation-{i}.json"))["status"] for i in (1,2)])' (both "completed") | The saved runs are marked completed rather than baseline-failed
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/src/skill_vibe_test/cli.py:54 | which means the run was executed with --no-baseline-gate
- VERIFIED | 2026-08-24 | cmd: python3 -c 'import json; d=json.load(open("projects/skill-vibe-test/skill-vibe-report/transcripts/conversation-2.json")); print([(t["turn"], [c[:60] for c in t["tool_calls"]]) for t in d["transcript"] if t["turn"] in (6,8)])' (both turns call python3 .../scripts/capabilities-health.py) | at both turn 6 and turn 8, the agent ran capabilities-health.py
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/skill-vibe-report/report.md:67 | the first and most important line of the rubric
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/skill-vibe-report/report.md:31-32 | It then skipped the log append and the diff proposal
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/skill-vibe-report/transcripts/conversation-1.json | because it is visible in the raw tool trace
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/skill-vibe-report/report.md:22-23 | asked at turn 6 whether any skills on disk were missing from the index
- VERIFIED | 2026-08-24 | cmd: python3 -c 'import json; d=json.load(open("projects/skill-vibe-test/skill-vibe-report/transcripts/conversation-1.json")); print([(t["turn"], t["tool_calls"]) for t in d["transcript"] if t["turn"] in (6,8)])' (turn 6: []; turn 8: one Bash ls over scripts/ and .claude/scripts/) | It made zero tool calls and answered from memory
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/skill-vibe-report/report.md:48 | It made one call, an ls of two directories
- VERIFIED | 2026-08-24 | cmd: python3 -c 'import json; d=json.load(open("projects/skill-vibe-test/skill-vibe-report/transcripts/conversation-1.json")); t=d["transcript"][0]; print(len(t["tool_calls"]), [c for c in t["tool_calls"] if "capabilities-health.py" in c])' (14, includes python3 scripts/capabilities-health.py) | it made fourteen calls including the census script the procedure requires
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/skill-vibe-report/report.md:16 | running the prescribed script and getting the log format wrong
- VERIFIED | 2026-08-24 | cmd: python3 -c 'import json; print([[len(t["tool_calls"]) for t in json.load(open(f"projects/skill-vibe-test/skill-vibe-report/transcripts/conversation-{i}.json"))["transcript"]] for i in (1,2)])' ([14,0,0,0,0,0,0,1,0,1], [13,0,0,0,0,3,0,1,0,2]) | Conversation 1 in cyan: 14 calls at turn 1, none at turns 2 to 7, 1 at turn 8
- VERIFIED | 2026-08-24 | cmd: python3 -c 'import json; print([len(t["tool_calls"]) for t in json.load(open("projects/skill-vibe-test/skill-vibe-report/transcripts/conversation-2.json"))["transcript"]])' ([13,0,0,0,0,3,0,1,0,2]) | Conversation 2 in amber: 13 at turn 1, none at turns 2 to 5, 3 at turn 6
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/skill-vibe-report/transcripts/conversation-1.json | the saved transcripts show it without agreeing with a single one of the judge's verdicts
- VERIFIED | 2026-08-24 | cmd: python3 -c 'import json; print([[p["context_tokens"] for p in json.load(open(f"projects/skill-vibe-test/skill-vibe-report/transcripts/conversation-{i}.json"))["probes"]] for i in (1,2)])' ([31925,37990,39384,40979], [38269,48966,52762,54838]) | context went from about 31k to 40k tokens in the first conversation and 38k to 54k in the second
- VERIFIED | 2026-08-24 | cmd: git -C projects/portfolio show 8aa389e:src/content/blog/skill-vibe-test-decay-probe.mdx (line 25: "Context grew from about 31k tokens at baseline to 54k by the end") | My original write-up quoted "31k to 54k," which is the start of one run and the end of the other
- VERIFIED | 2026-08-24 | cmd: git -C projects/portfolio show 8aa389e:src/content/blog/skill-vibe-test-decay-probe.mdx (lines 23-25: "the decay curve was textbook", escape hatches at turns 6 and 8 in both conversations, 31k to 54k, $1.77) | What I published: a textbook decay curve, eight of eight failed, four escape hatches, 31k to 54k
- VERIFIED | 2026-08-24 | cmd: python3 -c 'import json; d=json.load(open("projects/skill-vibe-test/skill-vibe-report/transcripts/conversation-2.json")); print([(t["turn"], [c[:60] for c in t["tool_calls"]]) for t in d["transcript"] if t["turn"] in (6,8)])' | two escape hatches and two over-called because conversation 2 ran the script at turns 6 and 8
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/src/skill_vibe_test/llm.py:126-134 | The truthful number is the last iteration only: the final API call's input tokens plus cache reads and cache writes
- UNCHECKABLE | 2026-08-24 | the 256k figure was seen in a terminal during the build and never saved; commit ab01523 (2026-07-02, "use the final API iteration, not the aggregated turn usage") fixes the sum but records no number | summing it produced an impossible 256k "context."
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/skill-vibe-report/report.md:48-55 | Early sandboxes were temp directories prefixed skill-vibe-, and a transcript showed the agent reading its own path
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/src/skill_vibe_test/workspace.py:74-76 | Sandboxes are now prefixed repo-. Anything the subject can observe
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/src/skill_vibe_test/cli.py:172-179 | The tool exits 1 on any decay, so a skill can be gated
- VERIFIED | 2026-08-24 | cmd: gh repo view marko-builds/skill-vibe-test --json visibility,url,licenseInfo (PUBLIC, MIT, https://github.com/marko-builds/skill-vibe-test) | The harness is public at github.com/marko-builds/skill-vibe-test
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/src/skill_vibe_test/conversation.py:223-227 | When the turn-1 probe fails and --no-baseline-gate is set, the run records it
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/src/skill_vibe_test/report.py:157-183 (write_transcripts carries no bypass field) | every artifact except the raw transcript JSON says so
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/src/skill_vibe_test/report.py:39-54 | The terminal summary leads with it, the report carries it as a banner above the results
- VERIFIED | 2026-08-24 | projects/skill-vibe-test/src/skill_vibe_test/chart.py:73-81 | the chart gets a red stamp across the top reading
- UNCHECKABLE | 2026-08-24 | a judgment restating the turn 6 and turn 8 rows above; no artifact of its own | The judge was too generous with one label

## Notes from the 2026-08-24 pass

Three claims were found wrong and fixed in the post before their rows were written:

1. excerpt: "by turn 6 the agent had stopped running the script" held for conversation 1 only;
   conversation 2 ran `capabilities-health.py` at turns 6, 8 and 10. Scoped to "in one of the two
   conversations".
2. "redrawn from its saved transcripts by the current harness": the inline figure is a hand-drawn
   SVG (portfolio commit 75c34cc); the harness renders only `decay.png` (`cli.py:154`, matplotlib).
   The harness's own re-render is the post's `ogImage`. Dropped "by the current harness".
3. "every artifact says so": `write_transcripts` (`report.py:157-183`) writes no bypass field, so the
   transcript JSON does not say so. Now "every artifact except the raw transcript JSON".

Also noted, not a post claim: `projects/skill-vibe-test/.gitignore:7` ignores `skill-vibe-report/`,
so the transcripts this ledger cites exist only on this machine.
