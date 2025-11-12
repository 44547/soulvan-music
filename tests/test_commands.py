def test_plan_arena_strategy():
    dummy_out = "./strategy/skyfire_arena_plan.json"
    Path("./strategy").mkdir(exist_ok=True)
    meta = commands.plan_arena_strategy("0xABC123", "Skyfire", "Best Beat Award", dummy_out)
    assert meta["status"] == "planned"
    assert Path(dummy_out).exists()


def test_cast_dao_vote():
    dummy_out = "./votes/skyfire_vote_record.json"
    Path("./votes").mkdir(exist_ok=True)
    meta = commands.cast_dao_vote("0xABC123", "Release FX Pack: Mythic Echoes Vol. 2", "Yes", dummy_out)
    assert meta["status"] == "recorded"
    assert Path(dummy_out).exists()


def test_track_crystal_delivery():
    dummy_out = "./missions/skyfire_crystal_tracker.json"
    Path("./missions").mkdir(exist_ok=True)
    meta = commands.track_crystal_delivery("0xABC123", "Skyfire Raid", dummy_out)
    assert meta["status"] == "tracked"
    assert Path(dummy_out).exists()
def test_compose_global_timeline():
    dummy_out = "./timelines/global_remix_mythos.png"
    Path("./timelines").mkdir(exist_ok=True)
    meta = commands.compose_global_timeline("All Factions", dummy_out)
    assert meta["status"] == "generated"
    assert Path(dummy_out).exists()


def test_generate_dna_archive():
    dummy_out = "./archives/dna_visual_map.png"
    Path("./archives").mkdir(exist_ok=True)
    meta = commands.generate_dna_archive("0xABC123", dummy_out)
    assert meta["status"] == "generated"
    assert Path(dummy_out).exists()
def test_visualize_remix_ancestry():
    dummy_out = "./visuals/skyfire_remix_ancestry.png"
    Path("./visuals").mkdir(exist_ok=True)
    meta = commands.visualize_remix_ancestry("0xABC123", "Skyfire", dummy_out)
    assert meta["status"] == "generated"
    assert Path(dummy_out).exists()


def test_trigger_lore_unlock():
    dummy_out = "./lore/skyfire_lore_unlocked.json"
    Path("./lore").mkdir(exist_ok=True)
    meta = commands.trigger_lore_unlock("0xABC123", "Remix Crystal Delivered", "Skyfire", dummy_out)
    assert meta["status"] == "unlocked"
    assert Path(dummy_out).exists()


def test_generate_guild_chronicle():
    dummy_out = "./chronicles/skyfire_contributor_legend.json"
    Path("./chronicles").mkdir(exist_ok=True)
    meta = commands.generate_guild_chronicle("0xABC123", "Skyfire", dummy_out)
    assert meta["status"] == "generated"
    assert Path(dummy_out).exists()


def test_synth_lore_narration():
    dummy_remix = "./remixes/skyfire_anthem.wav"
    dummy_out = "./vocals/skyfire_lore_narration.wav"
    Path("./remixes").mkdir(exist_ok=True)
    Path("./vocals").mkdir(exist_ok=True)
    Path(dummy_remix).write_bytes(b"dummy_remix")
    meta = commands.synth_lore_narration("0xABC123", dummy_remix, "English", "Mythic Cinematic", dummy_out)
    assert meta["status"] == "generated"
    assert Path(dummy_out).exists()
def test_explore_dna_archive():
    dummy_out = "./archives/skyfire_dna_lineage.png"
    Path("./archives").mkdir(exist_ok=True)
    meta = commands.explore_dna_archive("0xABC123", "Skyfire", dummy_out)
    assert meta["status"] == "generated"
    assert Path(dummy_out).exists()


def test_compose_sound_ritual():
    dummy_out = "./fx/skyfire_sound_ritual.wav"
    Path("./fx").mkdir(exist_ok=True)
    meta = commands.compose_sound_ritual("Skyfire", "Remix Crystal Delivery", "Mythic Ambient", "0xABC123", dummy_out)
    assert meta["status"] == "generated"
    assert Path(dummy_out).exists()
def test_replay_arena():
    dummy_out = "./replays/skyfire_shadowrift_replay.mp4"
    meta = commands.replay_arena("Skyfire vs Shadowrift", "0xABC123", dummy_out)
    assert meta["status"] == "generated"
    assert Path(dummy_out).exists()


def test_generate_tribute():
    dummy_out = "./tributes/skyfire_legend_tribute.mp4"
    meta = commands.generate_tribute("0xABC123", "Skyfire", dummy_out)
    assert meta["status"] == "generated"
    assert Path(dummy_out).exists()


def test_generate_evolution_timeline():
    dummy_out = "./timelines/skyfire_remix_evolution.png"
    meta = commands.generate_evolution_timeline("0xABC123", dummy_out)
    assert meta["status"] == "generated"
    assert Path(dummy_out).exists()
def test_install_award_fx_pack():
    dummy_out = "./fx/trap_award_pack.json"
    Path("./fx").mkdir(exist_ok=True)
    meta = commands.install_award_fx_pack("Trap", "Epic Slam FX", "0xABC123", dummy_out)
    assert meta["status"] == "installed"
    assert meta["genre"] == "Trap"
    assert Path(dummy_out).exists()


def test_global_genre_pulse_dashboard():
    dummy_out = "./dashboard.json"
    meta = commands.global_genre_pulse_dashboard(dummy_out)
    assert meta["status"] == "generated"
    assert "genres" in meta
    assert Path(dummy_out).exists()
def test_map_faction_prestige_evolution(tmp_path):
    output_file = tmp_path / "faction_prestige_evolution.json"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "map-faction-prestige-evolution",
        "--faction", "Skyfire",
        "--scope", "Global",
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    data = json.loads(output_file.read_text())
    assert data["faction"] == "Skyfire"
    assert "regions" in data


def test_launch_fusion_viewer(tmp_path):
    output_file = tmp_path / "global_prestige_ripple_view.json"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "launch-fusion-viewer",
        "--scope", "Global",
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    data = json.loads(output_file.read_text())
    assert data["scope"] == "Global"
    assert "prestigeEvolution" in data
    assert "remixRipples" in data


def test_replay_contributor_impact(tmp_path):
    output_file = tmp_path / "contributor_impact.json"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "replay-contributor-impact",
        "--wallet", "0xABC123...",
        "--faction", "Skyfire",
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    data = json.loads(output_file.read_text())
    assert data["wallet"] == "0xABC123..."
    assert data["faction"] == "Skyfire"
    assert "rippleEffects" in data


def test_archive_prestige_ripple_codex(tmp_path):
    input_file = tmp_path / "fusion_view.json"
    input_file.write_text('{"prestigeEvolution": [{"date": "2025-01-10"}], "remixRipples": [{"remix": "anthem_v2"}]}')
    output_file = tmp_path / "prestige_ripple_codex.json"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "archive-prestige-ripple-codex",
        "--scope", "Global",
        "--input", str(input_file),
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    data = json.loads(output_file.read_text())
    assert data["scope"] == "Global"
    assert data["archived"] is True
    assert "fusionEvents" in data


def test_launch_impact_replay_theater(tmp_path):
    output_file = tmp_path / "impact_theater.json"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "launch-impact-replay-theater",
        "--faction", "Skyfire",
        "--event", "Remix Ripple: Anthem v2 Mutation",
        "--mode", "guild-broadcast",
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    data = json.loads(output_file.read_text())
    assert data["faction"] == "Skyfire"
    assert data["event"] == "Remix Ripple: Anthem v2 Mutation"
    assert data["mode"] == "guild-broadcast"


def test_launch_ripple_ceremony_nexus(tmp_path):
    codex_file = tmp_path / "codex.json"
    codex_file.write_text('{"fusionEvents": [{"event": "Lore Unlock"}]}')
    output_file = tmp_path / "ripple_ceremony_nexus.json"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "launch-ripple-ceremony-nexus",
        "--scope", "Global",
        "--codex", str(codex_file),
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    data = json.loads(output_file.read_text())
    assert data["scope"] == "Global"
    assert "timeline" in data
    assert "replayNodes" in data


def test_view_faction_prestige_chronicle(tmp_path):
    output_file = tmp_path / "faction_prestige_chronicle.json"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "view-faction-prestige-chronicle",
        "--faction", "Skyfire",
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    data = json.loads(output_file.read_text())
    assert data["faction"] == "Skyfire"
    assert "prestigeTimeline" in data
    assert "loreChapters" in data


def test_update_leaderboard():
    dummy_out = "./leaderboards/skyfire_update.json"
    Path("./leaderboards").mkdir(exist_ok=True)
    meta = commands.update_leaderboard("Faction Remix Challenge", "0xABC123", 92.5, dummy_out)
    assert meta["status"] == "updated"
    assert Path(dummy_out).exists()


def test_expand_lore():
    dummy_remix = "./remixes/skyfire_anthem.wav"
    dummy_out = "./lore/skyfire_expansion.json"
    Path("./lore").mkdir(exist_ok=True)
    Path(dummy_remix).write_bytes(b"dummy_remix")
    meta = commands.expand_lore("Skyfire", dummy_remix, "0xABC123", dummy_out)
    assert meta["status"] == "expanded"
    assert Path(dummy_out).exists()


def test_simulate_dna_mutation():
    dummy_remix = "./remixes/skyfire_anthem.wav"
    dummy_out = "./dna/skyfire_mutation.json"
    Path("./dna").mkdir(exist_ok=True)
    Path(dummy_remix).write_bytes(b"dummy_remix")
    meta = commands.simulate_dna_mutation("0xABC123", dummy_remix, "Award Win: Best Beat", dummy_out)
    assert meta["status"] == "mutated"
    assert Path(dummy_out).exists()


def test_generate_deep_techno():
    dummy_out = "./beats/deep_techno_mission.wav"
    Path("./beats").mkdir(exist_ok=True)
    meta = commands.generate_deep_techno("Progressive Ambient", "FM Percussion, Reverb Swells", "0xABC123", dummy_out)
    assert meta["genre"] == "Deep Techno"
    assert Path(dummy_out).exists()


def test_generate_dub():
    dummy_out = "./beats/dub_echo_mission.wav"
    Path("./beats").mkdir(exist_ok=True)
    meta = commands.generate_dub("Analog Delay, Tape Echo", "Recon", "0xABC123", dummy_out)
    assert meta["genre"] == "Dub"
    assert Path(dummy_out).exists()


def test_generate_reggae():
    dummy_out = "./beats/reggae_mission_theme.wav"
    Path("./beats").mkdir(exist_ok=True)
    meta = commands.generate_reggae("Roots Revival", "English, Patois", "0xABC123", dummy_out)
    assert meta["genre"] == "Reggae"
    assert Path(dummy_out).exists()


def test_generate_trap():
    dummy_out = "./beats/trap_battle_drop.wav"
    Path("./beats").mkdir(exist_ok=True)
    meta = commands.generate_trap("808 Slam, Whisper Overlay", "Arena Battle", "0xABC123", dummy_out)
    assert meta["genre"] == "Trap"
    assert Path(dummy_out).exists()
import io
from pathlib import Path
import subprocess
import json
from soulmusic_cli import commands


def test_generate_beat_returns_wav_bytes():
    res = commands.generate_beat("Drill", "Cinematic", 140, "0xABC123")
    assert isinstance(res, dict)
    raw = res.get("raw_bytes")
    assert isinstance(raw, (bytes, bytearray))
    # WAV files start with ASCII 'RIFF'
    assert raw[:4] == b"RIFF"
    meta = res.get("meta")
    assert meta["genre"] == "Drill"


def test_studio_sync_suggestions():
    out = commands.studio_sync("./recordings/demo.wav", "guitar", "0xABC123", "rhythm")
    assert out["status"] == "queued"
    assert isinstance(out["suggestions"], list)


def test_remix_to_mission_includes_wallet():
    mission = commands.remix_to_mission("./beats/mybeat.wav", "0xABC123", "Skyfire")
    assert mission["wallet"] == "0xABC123"
    assert "mission_name" in mission


def test_compose_timeline_segments():
    res = commands.compose_timeline("./beats/mybeat.wav", "0xABC123", "Raid")
    assert "timeline" in res
    assert res["mission_type"] == "Raid"
    assert "voiceover" in res
    assert isinstance(res["ambient_fx"], list)


def test_remix_pulse_includes_suggestions():
    res = commands.remix_pulse("0xABC123")
    assert "trending_beats" in res
    assert "ai_suggestions" in res
    assert res["contributor_impact"]["wallet"] == "0xABC123"


def test_generate_photo_returns_png_bytes():
    res = commands.generate_photo("A warrior", "0xABC123", "cinematic", 512, 512)
    assert isinstance(res, dict)
    img_bytes = res.get("image_bytes")
    assert isinstance(img_bytes, bytes)
    # PNG starts with \x89PNG
    assert img_bytes[:4] == b'\x89PNG'
    meta = res.get("meta")
    assert meta["prompt"] == "A warrior"


def test_generate_video_meta():
    # Create dummy files
    dummy_audio = Path("/tmp/dummy_audio.wav")
    dummy_audio.write_bytes(b"dummy")
    dummy_image = Path("/tmp/dummy_image.png")
    dummy_image.write_bytes(b"dummy")

    res = commands.generate_video(dummy_audio, dummy_image, "0xABC123")
    assert "meta" in res
    assert res["meta"]["wallet"] == "0xABC123"


def test_visualize_dna():
    res = commands.visualize_dna("0xABC123", "./dna.png")
    assert "image_bytes" in res
    assert res["meta"]["wallet"] == "0xABC123"


def test_vote_upgrade():
    res = commands.vote_upgrade("0xABC123", "Add jazz", "yes")
    assert res["vote"] == "yes"
    assert "timestamp" in res


def test_onboard_contributor():
    profile = commands.onboard_contributor("0xNEW", "Skyfire", "Hyper", "./voice.wav", "./profile.json")
    assert profile["faction"] == "Skyfire"
    assert "remix_dna_seed" in profile


def test_launch_challenge():
    challenge = commands.launch_challenge("Skyfire", "Shadow", "Rebellion", "2025-12-01", "./challenge.json")
    assert challenge["theme"] == "Rebellion"
    assert "rewards" in challenge


def test_generate_starter_pack():
    pack = commands.generate_starter_pack("0xNEW", "Skyfire", "Hyper", "./test_pack.zip")
    assert pack["faction"] == "Skyfire"
    assert "contents" in pack


def test_archive_awards():
    archive = commands.archive_awards("0xABC", "Skyfire", "Best Beat", "./archive.json")
    assert archive["type"] == "json"


def test_install_fx_pack():
    pack = commands.install_fx_pack("Cinematic Echoes", "0xABC", "./fx_pack.json")
    assert pack["installed"] is True


def test_faction_sound_pulse():
    result = commands.faction_sound_pulse("Skyfire", "./pulse.png")
    assert "image_bytes" in result



def test_build_drop():
    dummy_in = "./beat.wav"
    dummy_out = "./beat_epicdrop.wav"
    Path(dummy_in).write_bytes(b"dummy_beat")
    meta = commands.build_drop(dummy_in, "High", "Tribal Cinematic", "0xABC123", dummy_out)
    assert meta["fx"] == "EpicDrop"
    assert Path(dummy_out).exists()


def test_apply_whisper_fx():
    dummy_in = "./vocal.wav"
    dummy_out = "./vocal_whispered.wav"
    Path(dummy_in).write_bytes(b"dummy_vocal")
    meta = commands.apply_whisper_fx(dummy_in, "Mythic Chant", "English", "0xABC123", dummy_out)
    assert meta["fx"] == "WhisperOverlay"
    assert Path(dummy_out).exists()


def test_inject_sync_markers():
    dummy_in = "./beat.wav"
    dummy_out = "./beat_synced.wav"
    Path(dummy_in).write_bytes(b"dummy_beat")
    meta = commands.inject_sync_markers(dummy_in, "intro:0s,drop:45s", "0xABC123", dummy_out)
    assert meta["fx"] == "SyncMarkers"
    assert Path(dummy_out).exists()


def test_generate_whisper_lore():
    dummy_out = "./skyfire_whisper_lore.wav"
    meta = commands.generate_whisper_lore("Skyfire", "Rise of the Remix Flame", "English", "0xABC123", dummy_out)
    assert meta["fx"] == "WhisperLore"
    assert Path(dummy_out).exists()


def test_compose_drop_mission():
    dummy_in = "./beat_epicdrop.wav"
    dummy_out = "./skyfire_drop_trigger.json"
    Path(dummy_in).write_bytes(b"dummy_beat")
    meta = commands.compose_drop_mission(dummy_in, "Skyfire", "Raid", "0xABC123", dummy_out)
    assert meta["drop_trigger"] == "auto-detected"
    assert Path(dummy_out).exists()


def test_synth_voiceover():
    dummy_out = "./skyfire_voiceover_jp.wav"
    meta = commands.synth_voiceover("From the depths of Skyfire...", "Japanese", "Cinematic", "0xABC123", dummy_out)
    assert meta["fx"] == "VoiceoverSynth"
    assert Path(dummy_out).exists()


def test_generate_crystal_delivery():
    dummy_in = "./beat_epicdrop.wav"
    dummy_out = "./skyfire_crystal_delivery.json"
    Path(dummy_in).write_bytes(b"dummy_beat")
    meta = commands.generate_crystal_delivery(dummy_in, "Skyfire Raid", "0xABC123", dummy_out)
    assert meta["trigger_event"] == "RemixCrystalDelivery"
    assert Path(dummy_out).exists()


def test_synth_crowd_chant():
    dummy_out = "./fx/skyfire_crowd_victory.wav"
    Path("./fx").mkdir(exist_ok=True)
    meta = commands.synth_crowd_chant("Skyfire", "Victory", "Multilingual", "0xABC123", dummy_out)
    assert meta["fx"] == "CrowdChantSynth"
    assert Path(dummy_out).exists()


def test_guild_prestige_boost_injector():
    dummy_out = "./guild_boost.json"
    meta = commands.guild_prestige_boost_injector("0xABC123", "Skyfire", "Originality", dummy_out)
    assert meta["status"] == "applied"
    assert Path(dummy_out).exists()
    
def test_export_global_lore(tmp_path):
    output_file = tmp_path / "global_remix_lore.json"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "export-global-lore",
        "--scope", "All Contributors",
        "--format", "json",
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    data = json.loads(output_file.read_text())
    assert data["scope"] == "All Contributors"
    assert data["format"] == "json"

def test_schedule_mission_replay(tmp_path):
    output_file = tmp_path / "mission_replay_schedule.json"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "schedule-mission-replay",
        "--wallet", "0xABC123...",
        "--mission", "Skyfire Crystal Raid",
        "--interval", "weekly",
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    data = json.loads(output_file.read_text())
    assert data["wallet"] == "0xABC123..."
    assert data["mission"] == "Skyfire Crystal Raid"
    assert data["interval"] == "weekly"


def test_launch_global_chronicle_nexus(tmp_path):
    # Create dummy chronicle files
    chronicle1 = tmp_path / "chronicle1.json"
    chronicle1.write_text('{"chronicle": [{"event": "Prestige Tier 1"}], "replayNodes": [], "loreChapters": [], "daoVotes": []}')
    chronicle2 = tmp_path / "chronicle2.json"
    chronicle2.write_text('{"chronicle": [{"event": "Lore Unlock"}], "replayNodes": [], "loreChapters": [], "daoVotes": []}')
    output_file = tmp_path / "global_chronicle_nexus.json"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "launch-global-chronicle-nexus",
        "--scope", "Global",
        "--input", str(tmp_path / "*.json"),
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    data = json.loads(output_file.read_text())
    assert data["scope"] == "Global"
    assert len(data["narrative"]) == 2
    assert "replayNodes" in data


def test_view_contributor_ripple_chronicle(tmp_path):
    output_file = tmp_path / "contributor_ripple_chronicle.json"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "view-contributor-ripple-chronicle",
        "--wallet", "0xABC123...",
        "--scope", "multi-faction",
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    data = json.loads(output_file.read_text())
    assert data["wallet"] == "0xABC123..."
    assert data["scope"] == "multi-faction"
    assert "rippleEffects" in data


def test_generate_global_prestige_narrative(tmp_path):
    codex_file = tmp_path / "codex.json"
    codex_file.write_text('{"fusionEvents": [{"event": "Lore Unlock"}]}')
    ripple_file = tmp_path / "ripple.json"
    ripple_file.write_text('{"rippleEffects": [{"faction": "Skyfire", "event": "Award Win"}]}')
    output_file = tmp_path / "global_narrative.json"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "generate-global-prestige-narrative",
        "--codex", str(codex_file),
        "--ripples", str(tmp_path / "*.json"),
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    data = json.loads(output_file.read_text())
    assert data["title"] == "Global Prestige Ripple Saga"
    assert "arcs" in data
    assert "key_events" in data


def test_launch_faction_ripple_fusion_dashboard(tmp_path):
    contributor_file = tmp_path / "contributor.json"
    contributor_file.write_text('{"wallet": "0xABC123...", "scope": "multi-faction", "rippleEffects": [{"faction": "Skyfire", "event": "Lore Unlock"}]}')
    output_file = tmp_path / "faction_dashboard.png"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "launch-faction-ripple-fusion-dashboard",
        "--faction", "Skyfire",
        "--contributors", str(tmp_path / "*.json"),
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    # PNG file should exist, but we can't easily check content without PIL


def test_generate_hit(tmp_path):
    output_file = tmp_path / "heavenflow_v1.wav"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "generate-hit",
        "--intent", "heavenly, flowing, soul-moving",
        "--tempo", "92",
        "--genre", "alt-pop gospel shimmer",
        "--target", "EU late-night driving",
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    meta_file = tmp_path / "heavenflow_v1_meta.json"
    assert meta_file.exists()
    data = json.loads(meta_file.read_text())
    assert data["intent"] == "heavenly, flowing, soul-moving"
    assert data["tempo"] == 92


def test_ab_test(tmp_path):
    input_file = tmp_path / "input_track.wav"
    input_file.write_bytes(b"dummy_input")
    output_file = tmp_path / "selected_track.wav"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "ab-test",
        "--input", str(input_file),
        "--variants", "5",
        "--metric", "replay_rate,hook_retention",
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    meta_file = tmp_path / "selected_track_ab_test.json"
    assert meta_file.exists()
    data = json.loads(meta_file.read_text())
    assert data["variants_generated"] == 5
    assert "replay_rate" in data["metrics"]


def test_auto_refresh_model(tmp_path):
    feedback_file = tmp_path / "feedback.json"
    feedback_file.write_text('{"streams": 1000, "sentiment": "positive"}')
    output_dir = tmp_path / "models"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "auto-refresh-model",
        "--scope", "creative,arrangement,lyric",
        "--feedback", str(feedback_file),
        "--output", str(output_dir)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    meta_file = output_dir / "model_meta.json"
    assert meta_file.exists()
    data = json.loads(meta_file.read_text())
    assert "creative" in data["scope"]
    assert data["deploy_status"] == "blue_green_ready"


def test_generate_party_track(tmp_path):
    fx_pack_file = tmp_path / "club_risers.json"
    fx_pack_file.write_text('{"risers": ["up", "down"]}')
    output_file = tmp_path / "party_hit_v1.wav"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "generate-party-track",
        "--intent", "danceable, joyful, party vibes",
        "--tempo", "124",
        "--genre", "house-pop hybrid",
        "--fx-pack", str(fx_pack_file),
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    meta_file = tmp_path / "party_hit_v1_meta.json"
    assert meta_file.exists()
    data = json.loads(meta_file.read_text())
    assert data["tempo"] == 124
    assert "groove" in data["features"]


def test_generate_festival_anthem(tmp_path):
    fx_pack_file = tmp_path / "festival_fx.json"
    fx_pack_file.write_text('{"risers": ["stadium"], "drops": ["sub-bass"]}')
    output_file = tmp_path / "festival_anthem_v1.wav"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "generate-festival-anthem",
        "--intent", "crowd-ready, euphoric, large-scale",
        "--tempo", "128",
        "--genre", "EDM-pop hybrid",
        "--fx-pack", str(fx_pack_file),
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    meta_file = tmp_path / "festival_anthem_v1_meta.json"
    assert meta_file.exists()
    data = json.loads(meta_file.read_text())
    assert data["tempo"] == 128
    assert "crowd" in data["features"]


def test_visualize_club_mix_evolution(tmp_path):
    remix_file = tmp_path / "remix1.json"
    remix_file.write_text('{"battle": "Battle 1", "mutations": ["FX swap"]}')
    output_file = tmp_path / "club_mix_evolution.json"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "visualize-club-mix-evolution",
        "--scope", "battle-series",
        "--input", str(tmp_path / "*.json"),
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    data = json.loads(output_file.read_text())
    assert data["scope"] == "battle-series"
    assert data["remixes"] == 1


def test_archive_party_anthem(tmp_path):
    output_file = tmp_path / "global_party_anthem.json"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "archive-party-anthem",
        "--event", "Festival Anthem Release",
        "--genre", "EDM-pop hybrid",
        "--wallet", "0xABC123...",
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    data = json.loads(output_file.read_text())
    assert data["event"] == "Festival Anthem Release"
    assert data["genre"] == "EDM-pop hybrid"
    assert data["wallet"] == "0xABC123..."
    assert data["status"] == "archived"


def test_replay_remix_battle(tmp_path):
    output_file = tmp_path / "remix_battle_highlights.json"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "replay-remix-battle",
        "--battle-id", "RB2025-07",
        "--mode", "interactive",
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    data = json.loads(output_file.read_text())
    assert data["battleId"] == "RB2025-07"
    assert data["mode"] == "interactive"
    assert data["finalWinner"] == "0xGHI789..."
    assert data["status"] == "replayed"


def test_launch_party_anthem_replay(tmp_path):
    output_file = tmp_path / "global_party_anthem_session.json"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "launch-party-anthem-replay",
        "--anthem-id", "ANTHEM2025-09",
        "--mode", "festival",
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    data = json.loads(output_file.read_text())
    assert data["anthemId"] == "ANTHEM2025-09"
    assert data["mode"] == "festival"
    assert data["broadcast"]["scope"] == "global"
    assert data["status"] == "launched"


def test_view_remix_lineage_fusion(tmp_path):
    output_file = tmp_path / "shadowrift_lineage_fusion.json"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "view-remix-lineage-fusion",
        "--faction", "Shadowrift",
        "--battle-series", "RB2025",
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    data = json.loads(output_file.read_text())
    assert data["faction"] == "Shadowrift"
    assert data["battleSeries"] == "RB2025"
    assert data["soundIdentity"] == "tribal-ethereal hybrid"
    assert data["status"] == "viewed"


def test_launch_anthem_fusion_nexus(tmp_path):
    anthem_file = tmp_path / "anthem.json"
    anthem_file.write_text('{"anthemId": "ANTHEM2025-09"}')
    fusion_file = tmp_path / "fusion.json"
    fusion_file.write_text('{"fusionEvents": [{"event": "Fusion"}]}')
    output_file = tmp_path / "global_anthem_fusion.json"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "launch-anthem-fusion-nexus",
        "--scope", "Global",
        "--input", str(anthem_file),
        "--fusion", str(fusion_file),
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    data = json.loads(output_file.read_text())
    assert data["scope"] == "Global"
    assert "anthem" in data
    assert "fusion" in data
    assert data["status"] == "launched"


def test_view_prestige_fusion_chronicle(tmp_path):
    output_file = tmp_path / "prestige_fusion_chronicle.json"
    result = subprocess.run([
        "python", "-m", "soulmusic_cli.cli", "view-prestige-fusion-chronicle",
        "--faction", "Skyfire",
        "--scope", "Global+Faction",
        "--output", str(output_file)
    ], capture_output=True, text=True)
    assert result.returncode == 0
    assert output_file.exists()
    data = json.loads(output_file.read_text())
    assert data["faction"] == "Skyfire"
    assert data["scope"] == "Global+Faction"
    assert len(data["chronicleEvents"]) == 1
    assert data["status"] == "viewed"
